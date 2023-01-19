import { Worker } from "near-workspaces";
import test from "ava";

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Prepare sandbox for tests, create accounts, deploy contracts, etc.
  const root = worker.rootAccount;

  // Deploy the counter contract.
  const nearuko = await root.createSubAccount("nearuko");
  await nearuko.deploy("./build/nft.wasm");

  await nearuko.call(nearuko, "init", {
    owner_id: root.accountId,
    metadata: {
      spec: "nft-1.0.0",
      name: "Nearuko",
      symbol: "NEARUKO",
    },
  });

  // Test users
  const ali = await root.createSubAccount("ali");
  const bob = await root.createSubAccount("bob");

  // Save state for test runs
  t.context.worker = worker;
  t.context.accounts = { root, nearuko, ali, bob };
});

// If the environment is reused, use test.after to replace test.afterEach
test.afterEach(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to tear down the worker:", error);
  });
});

test("nft metadata check", async (t) => {
  const { nearuko } = t.context.accounts;
  const result = await nearuko.view("nft_metadata", {});
  t.is(result.spec, "nft-1.0.0");
  t.is(result.name, "Nearuko");
  t.is(result.symbol, "NEARUKO");
});

test("nft mint test", async (t) => {
  const { root, nearuko, ali } = t.context.accounts;
  const result = await root.call(
    nearuko,
    "nft_mint",
    {
      token_id: "1",
      metadata: {
        title: "Ali",
        description: "Ali is",
        media: "https://near.org",
        media_hash: null,
        copies: 1,
        issued_at: "2021-01-01T00:00:00Z",
        expires_at: null,
        starts_at: null,
        updated_at: null,
        extra: null,
        reference: null,
        reference_hash: null,
      },
      receiver_id: ali.accountId,
    },
    {
      attachedDeposit: "1000000000000000000000000",
    }
  );

  // root가 아닌 사용자가 mint를 하면 실패한다.
  await t.throwsAsync(async () => {
    await ali.call(
      nearuko,
      "nft_mint",
      {
        token_id: "2",
        metadata: {
          title: "Ali",
          description: "Ali is",
          media: "https://near.org",
          media_hash: null,
          copies: 1,
          issued_at: "2021-01-01T00:00:00Z",
          expires_at: null,
          starts_at: null,
          updated_at: null,
          extra: null,
          reference: null,
          reference_hash: null,
        },
        receiver_id: ali.accountId,
      },
      {
        attachedDeposit: "1000000000000000000000000",
      }
    );
  });

  // total supply가 1이어야 한다.
  const totalSupply = await nearuko.view("nft_total_supply", {});
  t.is(totalSupply, 1);
});

test("nft transfer test", async (t) => {
  const { root, nearuko, ali, bob } = t.context.accounts;
  // ali한테 하나 mint 한다.
  await root.call(
    nearuko,
    "nft_mint",
    {
      token_id: "1",
      metadata: {
        title: "Ali",
        description: "Ali is",
        media: "https://near.org",
        media_hash: null,
        copies: 1,
        issued_at: "2021-01-01T00:00:00Z",
        expires_at: null,
        starts_at: null,
        updated_at: null,
        extra: null,
        reference: null,
        reference_hash: null,
      },
      receiver_id: ali.accountId,
    },
    {
      attachedDeposit: "1000000000000000000000000",
    }
  );

  // ali가 bob한테 1번을 전송한다.
  await ali.call(
    nearuko,
    "nft_transfer",
    {
      receiver_id: bob.accountId,
      token_id: "1",
      approval_id: null,
      memo: null,
    },
    {
      attachedDeposit: "1",
    }
  );

  // bob이 1번을 소유하고 있어야 한다.
  const token = await nearuko.view("nft_token", { token_id: "1" });
  t.is(token.owner_id, bob.accountId);
});

test("nft burn test", async (t) => {
  const { root, nearuko, ali } = t.context.accounts;
  // ali한테 하나 mint 한다.
  await root.call(
    nearuko,
    "nft_mint",
    {
      token_id: "1",
      metadata: {
        title: "Ali",
        description: "Ali is",
        media: "https://near.org",
        media_hash: null,
        copies: 1,
        issued_at: "2021-01-01T00:00:00Z",
        expires_at: null,
        starts_at: null,
        updated_at: null,
        extra: null,
        reference: null,
        reference_hash: null,
      },
      receiver_id: ali.accountId,
    },
    {
      attachedDeposit: "1000000000000000000000000",
    }
  );

  // bob이 1번을 폐기하려고 하면 실패한다.
  await t.throwsAsync(async () => {
    await bob.call(
      nearuko,
      "nft_burn",
      {
        token_id: "1",
      },
      {
        attachedDeposit: "1",
      }
    );
  });

  // total supply가 1이어야 한다.
  const totalSupply = await nearuko.view("nft_total_supply", {});
  t.is(totalSupply, 1);

  // token id 1이 존재해야 한다.
  const token = await nearuko.view("nft_token", { token_id: "1" });
  t.is(token.token_id, "1");

  // ali가 1번을 폐기한다.
  await ali.call(
    nearuko,
    "nft_burn",
    {
      token_id: "1",
    },
    {
      attachedDeposit: "1",
    }
  );

  // total supply가 0이어야 한다.
  const totalSupply2 = await nearuko.view("nft_total_supply", {});
  t.is(totalSupply2, 0);
});

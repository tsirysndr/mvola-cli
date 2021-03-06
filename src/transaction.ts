import {
  Client,
  SANDBOX_URL,
  PRODUCTION_URL,
  TransactionRequest,
} from "https://deno.land/x/mvola@0.0.4/mod.ts";
import { colorize } from "https://deno.land/x/json_colorize@0.1.0/mod.ts";
import { colors } from "./colors.ts";

export async function sendPayment(
  debitParty: string,
  creditParty: string,
  amount: number,
  partnerName: string,
  description: string,
  live = false,
  disableColors: boolean
) {
  const mvola = new Client(live ? PRODUCTION_URL : SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const { access_token } = await mvola.auth.generateToken(
    consumerKey!,
    consumerSecret!
  );

  mvola.transaction.setAccessToken(access_token);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: crypto.randomUUID(),
    userLanguage: "FR",
    userAccountIdentifier: `msisdn;${debitParty}`,
    partnerName,
  });

  const transactionRef = crypto.randomUUID();

  const tx: TransactionRequest = {
    amount,
    currency: "Ar",
    descriptionText: description,
    requestDate: new Date().toISOString(),
    debitParty: [
      {
        key: "msisdn",
        value: debitParty,
      },
    ],
    creditParty: [
      {
        key: "msisdn",
        value: creditParty,
      },
    ],
    metadata: [
      {
        key: "partnerName",
        value: "TestMVola",
      },
      {
        key: "fc",
        value: "USD",
      },
      {
        key: "amountFc",
        value: "1",
      },
    ],
    requestingOrganisationTransactionReference: transactionRef,
    originalTransactionReference: transactionRef,
  };
  const data = await mvola.transaction.sendPayment(tx);

  if (disableColors) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(colorize(JSON.stringify(data, null, 2), { colors }));
}

export async function getTransactionDetails(
  id: string,
  live = false,
  disableColors = false
) {
  const mvola = new Client(live ? PRODUCTION_URL : SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const { access_token } = await mvola.auth.generateToken(
    consumerKey!,
    consumerSecret!
  );

  mvola.transaction.setAccessToken(access_token);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: crypto.randomUUID(),
    userAccountIdentifier: "msisdn;0343500003",
  });

  const data = await mvola.transaction.get(id);

  if (disableColors) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(colorize(JSON.stringify(data, null, 2), { colors }));
}

export async function getTransactionStatus(
  serverCorrelationId: string,
  debitParty: string,
  partnerName: string,
  live = false,
  disableColors = false
) {
  const mvola = new Client(live ? PRODUCTION_URL : SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const { access_token } = await mvola.auth.generateToken(
    consumerKey!,
    consumerSecret!
  );

  mvola.transaction.setAccessToken(access_token);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: crypto.randomUUID(),
    userLanguage: "FR",
    userAccountIdentifier: `msisdn;${debitParty}`,
    partnerName,
  });

  const data = await mvola.transaction.getStatus(serverCorrelationId);

  if (disableColors) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(colorize(JSON.stringify(data, null, 2), { colors }));
}

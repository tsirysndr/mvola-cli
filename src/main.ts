import {
  Command,
  CompletionsCommand,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { generateToken } from "./auth.ts";
import {
  sendPayment,
  getTransactionStatus,
  getTransactionDetails,
} from "./transaction.ts";

const consumerKey = Deno.env.get("CONSUMER_KEY");
const consumerSecret = Deno.env.get("CONSUMER_SECRET");

if (!consumerKey || !consumerSecret) {
  console.error("CONSUMER_KEY and CONSUMER_SECRET environment variables are required");
  Deno.exit(1);
}

await new Command()
  .name("mvola")
  .version("0.1.0")
  .description(
    `The unofficial command-line tool to interact with MVola API

    __  ____    __      __         ________    ____
   /  |/  / |  / /___  / /___ _   / ____/ /   /  _/
  / /|_/ /| | / / __ \\/ / __ \`/  / /   / /    / /  
 / /  / / | |/ / /_/ / / /_/ /  / /___/ /____/ /   
/_/  /_/  |___/\\____/_/\\__,_/   \\____/_____/___/   
                                                   

`
  )
  .action(function (this: Command) {
    this.showHelp();
  })
  .command("generateToken", "Generate a new MVola API token")
  .action(() => generateToken())
  .command("completions", new CompletionsCommand())
  .command(
    "transactions",
    new Command()
      .action(function (this: Command) {
        this.showHelp();
      })
      .command("send", "Send a transaction")
      .option("-d, --description <description>", "Transaction description", {
        default: "Test transaction",
      })
      .option("-p, --partnerName <partnerName>", "Partner name", { default: "TestMVola" })
      .option("-l, --live", "Use production MVola API", { default: false })
      .arguments("<debitParty> <creditParty> <amount:number>")
      .action((options, debitParty, creditParty, amount) => {
        sendPayment(
          debitParty,
          creditParty,
          amount,
          options.partnerName.toString(),
          options.description.toString(),
          options.live
        );
      })
      .command("status", "Get transaction status")
      .option("-d, --debitParty <debitParty>", "Debit party", { required: true })
      .option("-p, --partnerName <partnerName>", "Partner name", { default: "TestMVola" })
      .option("-l, --live", "Use production MVola API", { default: false })
      .arguments("<serverCorrelationId>")
      .action((options, serverCorrelationId) => {
        getTransactionStatus(
          serverCorrelationId,
          options.debitParty!.toString(),
          options.partnerName.toString(),
          options.live
        );
      })
      .command("details", "Get transaction details")
      .option("-l, --live", "Use production MVola API", { default: false })
      .arguments("<transactionId>")
      .action((options, transactionId) => {
        getTransactionDetails(transactionId, options.live);
      })
  )
  .description("Make requests (send, status, details) on transaction endpoints")
  .parse(Deno.args);

import {
  Command,
  CompletionsCommand,
} from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";

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
  .action(() => {
    console.log("Generate a new MVola API token");
  })
  .command("completions", new CompletionsCommand())
  .command(
    "transactions",
    new Command()
      .action(function (this: Command) {
        this.showHelp();
      })
      .command("send", "Send a transaction")
      .arguments("<debitParty> <creditParty> <amount>")
      .command("status", "Get transaction status")
      .arguments("<transactionId>")
      .command("details", "Get transaction details")
      .arguments("<transactionId>")
  )
  .description("Make requests (send, status, details) on transaction endpoints")
  .parse(Deno.args);

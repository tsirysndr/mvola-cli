---
sidebar_position: 5
---

# Get Transaction Details

Show the details of a transaction.


```bash title="Execute"
 mvola transactions details 636042511
```

```json title="Response"
{
  "amount": "10000.00",
  "currency": "Ar",
  "requestDate": "2022-08-03T15:24:58.417Z",
  "debitParty": [
    {
      "key": "msisdn",
      "value": "0343500003"
    }
  ],
  "creditParty": [
    {
      "key": "msisdn",
      "value": "0343500004"
    }
  ],
  "fees": [
    {
      "feeAmount": "150"
    }
  ],
  "metadata": [
    {
      "key": "originalTransactionResult",
      "value": "0"
    },
    {
      "key": "originalTransactionResultDesc",
      "value": "0"
    }
  ],
  "transactionStatus": "completed",
  "creationDate": "2022-05-03T18:09:10.391Z",
  "transactionReference": "636769252"
}
```

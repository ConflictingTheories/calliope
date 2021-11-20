# How To: DLT Crowd Funding Platform : Part 1 &#8211; Micro-transactions w/ Iota
~ 2019-09-08T22:58:00+00:00 ~
  
---
Today we are going to be looking at [Iota](https://www.iota.org/) and how we can build a framework around their Cryptocurrency. The goal is very simple – **a crowd-funding platform** – one which people can be paid out after a certain amount of time and a condition is met (such as amount of funds raised)

#### Definitions

For this example – we will use the following definitions:

**Recipient Address –** This is an address which will receive payment as an output of funds

**Donor Input Address –** This is an address which will provide payment and act as an input of funds. It will used to send the donated funds – these will be sent to the escrow address.

**Donor Callback Addresses –** These are addresses which will be used in addition when a donor send currency to the crowdfunding project. It will be used to return their money should the crowd funding not succeed.

**Escrow Address –** This will be the address used to hold the funds until the crowdfunding campaign is completed (either successfully or not). It will retain the storage of the currency and will not be accessible by either the donors nor the recipients.

**Crowdfund Address –** This will be an address controlled by the submitter of the crowdfunding project. It will be paid out by the escrow account should the crowdfunding project succeed.

**Operating Account –** This will be automated account that will manage the crowdfunding platform. It will be used to manage the escrow accounts and perform the payment or refunds as necessary.

**Crowdfunding Financial Goal –** This is the fiscal goal which is required to be raised prior to the deadline. If the goal is met, the payments are sent to the crowdfunding account. If they are not, they the donations are refunded.

**Crowdfunding Duration –** This is the time condition for the project. It will determine when the money will be unlocked and either sent out, or returned to the donors.

#### Mechanism for Escrow Payments

The mechanism will be a simple system. It will result in two main transaction events – in truth their are a few more events than just the two, but for the purposes of simplicity, we will discuss it from the two main perspectives:

**Crowdfunder’s Perspective** – They will be asked to register their project and to initialise it for funds. The project will be a collection of information alongside a finalized checksum of their uploaded content. This will be then used and stored alongside their registration. To finalize and enable their project, they will have to attach a freshly generated address whereby their funds can be sent if the project succeeds.

**Donor’s Perspective** – The donors will be asked to provide two actions – registration and payment. Registration will assign their donation alongside a callback address – this address will need to be securely generated and will need to be fresh. The second action, will be payment whereby they send funds from their account to the escrow address alongside their registration number – this will be used to tie their particular donation amount with their address.

When the projects are live, multiple donors will be able to send their donations over the Iota network and pledge their support for the project. Having a proper system setup for the escrow payments will allow for the donations to be made securely without fear of the crowdfunding project getting paid without completing their goal – it will assure that all donations can be tracked and reversed if needed, but at the same time, cannot be cancelled by the donor because of cold-feet.

To be Continued….
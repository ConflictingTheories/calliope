# Dynamic DNS &#8211; Using AWS CLI
~ 2019-10-30T23:20:25+00:00 ~
  
I have noticed more and more services offering “dynamic DNS” services. Many of these provide a simple RESTful API interface for developers to quickly setup a DNS endpoint pointing to their local machines.

I wanted to do something similar, but I rarely like using 3rd-party hosted software unless it is something that is a pain to setup or is a proprietary platform of some kind – in this case it is neither so I figured I would provide a tutorial for existing AWS users to setup their own Dynamic DNS service.

The Requirements are:

- Domain Name
- AWS Account w/ Billing Enabled
- Local Linux/Mac Machine
- Internet Connection
- AWS CLI
- Cron
- Port-forwarding Enabled Router

#### **Lets get started!**

First, this article assumes you have a DNS currently hosted within AWS. If not, please review [https://docs.aws.amazon.com/en\_pv/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html](https://docs.aws.amazon.com/en_pv/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html) for a detailed look at migrating your domain name into AWS’s Route 53. The rest of this article assumes you have a valid domain name and have it setup as a valid hosted zone.

![](../../uploads/2019/10/0228a80b-47d8-40eb-b2c9-037bc0760f2a-1024x531.png)Next, assuming you have setup the DNS routing correctly – we need to setup our AWS CLI so we can manage our Route 53 Resources. This can be found via the **IAM** service within the AWS console.

Now that we have our account, we should configure our local machine to use these credentials. Note, since you may have multiple profiles and credentials to use – we will setup a profile name for our new user.

~~~
$ aws configure --profile route-53-ddns
~~~

This will prompt you to enter the credentials you just created (access key + secret and region information). If all is good, you will have the credentials ready under that profile for use. So, lets start to use them.

#### Ready for Trials

We are going to be making a simple script – **auto-ddns.sh:**

~~~
#!/bin/bash

# AWS Configured Profile // aws configure --profile ${AWS_PROFILE}
declare -x AWS_PROFILE=route-53-ddns

# Get External IP (Dynamically Changes - Not Static)
declare -x EXTERNAL_IP_ADDR=$(dig @ns1.google.com TXT o-o.myaddr.l.google.com +short)

# Domain Name Configuration (subdomain-name.example.com)
declare -x AWS_HOSTED_ZONE_ID=ZXXXXXXXXXX
declare -x DOMAIN_NAME=.example.com
declare -x SUBDOMAIN=subdomain-name

# Generate Folder (Store Logs / Etc)
mkdir -p ~/.aws-setup

# Generate Config JSON File
cat <<EOF > ~/.aws-setup/auto-dns.json
{
    "Comment": "Update External DNS Record - Dynamically ",
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "${SUBDOMAIN}${DOMAIN_NAME}",
            "Type": "A",
            "TTL": 300,
            "ResourceRecords": [{ "Value": ${EXTERNAL_IP_ADDR} }]
        }
    }]
}
EOF

# Caution! Make sure you have configured your AWS Correctly 
# (See above for profile)
#

# Run Configuration Update
aws route53 change-resource-record-sets \
--profile ${AWS_PROFILE} --hosted-zone-id ${AWS_HOSTED_ZONE_ID} \
--change-batch file://~/.aws-setup/auto-dns.json \
>> ~/.aws-setup/auto-dns.change-log

~~~

If we look at this small script we can see it is pretty straightforward. First, it declares some information (such as our external IP address and desired domain name) – then it writes a configuration file for Route 53 which will UPSERT (create or update) an entry into our DNS zone.

In short – what this does is:

1. Fetch External IP Address
2. Setup Subdomain Name of Choice
3. Configure Route 53 to point Subdomain to our External IP

At this point – you are almost ready. Time to test it. I usually use SSH as my go-to-test, so I will finish it with that in mind.

#### Port Forwarding

Unless you have no router, it is likely that your newly routed traffic will fail to reach its final intended destination. In order to fix this, we will need to port-forward some of the routers ports to those on our machine. If you have no preference and not a lot of machines you can forward 1-1, but usually it is advised to pick a different port from the one you are communicating with. Ex. Port 2022 on the router points to 22 on the machine.

Setup a few ports that you will need access to and remember which ones they are if they aren’t 1-1.

#### Hello, machine!

Now, you should be able to SSH remotely into your machine using your newly defined domain – that was easy. The only final thing you need to do (as chances are your IP address changes from time-to-time) is set it up to automatically update the records. Here is where we have cron help us.

~~~
0 1,13 * * * /home/<username>/.aws-setup/auto-ddns.sh
~~~

The above will run our script twice a day (every 12 hours) once at 1 AM and again 1 PM. This should be sufficient enough to capture our change, but of course if you prefer you can always make it run more frequently.

Thanks for reading and I hope this helps some of you looking to setup your own Dynamic DNS service and stop using 3rd-party ones.
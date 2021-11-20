# Self-Coding Embedded Encryption
~ 2021-01-15T12:54:00+00:00 ~

In continuation on the last post - I have been thinking about something that I think would be interesting. A type of embedded decryption mechanism which requires authorized access to decrypt - but keep everything self-contained.

My vision is some sort of embed script which at load - requests a decryption key which also provides the algorithmic decryption method as well which is then client-side decrypted and the content is then refreshed once decrypted. This would then allow all requests to be encrypted at the source level. 

By encoding the encryption method within the key itself, it also means that you cannot immediately determine the encryption techniques unless you know the correct key to begin with. I want to encorporate something like this if possible into my security 'Sovereignty' tokens.

This would help provide public exposure - private access - plausible deniability for hosts.


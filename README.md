## Post migration tool from Hexo to Pressone

If you have your own blog site hosted using Hexo and you want to move to Press.one, sign and bind contract to those posts, this is definitely the perfect tool for you.

## Usage

### Preparation

You must have the Press.one address and private key ready before using this tool.

1. Login Press.one
2. Click "Auth Setting" from menu
3. Download your keystore file
4. Get the "address" content in the keystore file (Open it using any text editor)

```json
// keystore file sample
{"address":"13848d46b2a0510f2881f53701ed47435bf7c29d","crypto":{"cipher":"aes-128-ctr","ciphertext":"123456","cipherparams":{"iv":"123456"},"mac":"123456","kdf":"pbkdf2","kdfparams":{"c":123456,"dklen":32,"prf":"hmac-sha256","salt":"123456"}},"id":"123456","version":3}
```

5. Get the "private key" using the `retrievePrivateKey` function in [./lib/utility.js](./lib/utility.js)

### Execution

After you obtain the Press.one address and private key, you can start the migration process

1. Creates `dev.js` or `prod.js` in `config` folder based on `sample.js`.  `dev.js` is for Press.one beta environment;  `prod.js` is for main site.
2. Execute Command `npm install` if you haven't done so
3. Set environment variable `PRS_ENV` to `prod` if you want to migrate to Press.one main site.  Else, it's for testing.  In Mac/linux: `export PRS_ENV=prod`;  In Windows: `set PRS_ENV=prod`. 
4. Execute Command `node index.js "your_hexo_post_file_name.md"` if you just want to migrate a single post.  Execute Command `node index.js "post_a.md" "post_e.md"` if you want to migrate a series of posts.  

Welcome to my [Press.one home page](https://press.one/main/p/b294d95ad0b3d76c0fdd60dcc576a8448b0e3f06) and leave a tip.

## License

MIT

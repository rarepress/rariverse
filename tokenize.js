const Rarepress = require('rarepress')
const fs = require('fs')
const rarepress = new Rarepress();
(async () => {
  await rarepress.init({ network: "mainnet" })
  let codeBuffer = await fs.promises.readFile("index.html")
  let imageBuffer = await fs.promises.readFile("rariverse.png")
  let code_cid = await rarepress.fs.add(codeBuffer)
  let image_cid = await rarepress.fs.add(imageBuffer)
  let token = await rarepress.token.create({
    type: "ERC721",
    metadata: {
      name: "Rariverse",
      description: "A 1 of 1 ERC721 NFT that tokenizes the FIRST snapshot of Rariverse, a decentralized website that lets you deploy a decentralized NFT marketplace contract to Ethereum.",
      image: "/ipfs/" + image_cid,
      attributes: [{
        trait_type: "HTML over IPFS Gateway",
        value: "https://ipfs.io/ipfs/" + code_cid
      }, {
        trait_type: "website hosted on IPFS",
        value: code_cid
      }, {
        trait_type: "GitHub",
        value: "https://github.com/rarepress/rariverse"
      }, {
        trait_type: "HTTP Website",
        value: "https://rariverse.org"
      }]
    }
  })
  await rarepress.fs.push(code_cid)
  await rarepress.fs.push(image_cid)
  await rarepress.fs.push(token.uri)
  let sent = await rarepress.token.send(token)
  console.log("sent", sent)
})();

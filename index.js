const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'play.noblerealms.com', // NobleRealms Server IP
  port: 19132,                  // Bedrock Port
  username: '*Dev7Chowdary',    // Your exact account username
  auth: 'microsoft'            
});

bot.once('spawn', () => {
  console.log("Bot successfully joined NobleRealms!");
  
  // Wait 5 seconds for chunks to load up, then type your commands
  setTimeout(() => {
    
    // STEP 1: CHANGE THE TEXT INSIDE QUOTES TO YOUR TP COMMAND
    // Examples: "/pwarp farm", "/home farm", or "/tpa friendname"
    bot.chat("/home 4"); 
    console.log("Teleport command sent.");
    
    // Step 2: Say a quick message in chat 3 seconds after moving
    setTimeout(() => {
      bot.chat("I am now AFK at my farm coordinates.");
      console.log("AFK text sent.");
    }, 3000);

  }, 5000); 
});

// Auto-reconnect loop if kicked or if the server resets
bot.on('end', () => {
  console.log("Disconnected from NobleRealms. Reconnecting in 15 seconds...");
  setTimeout(() => {
    process.exit(1); 
  }, 15000);
});

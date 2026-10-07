const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

const bot = mineflayer.createBot({
  host: 'YOUR_SERVER_IP_HERE', // <-- Put your server IP address here
  port: 19132,                 // <-- Put your Bedrock Port here (Default is 19132)
  username: 'AFK_Bot_Cloud',   // <-- The name your bot will use in game
  auth: 'microsoft'            // <-- Requires Microsoft login authentication for public servers
});

bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
  console.log("Bot successfully joined the server!");
  
  // Set your target farm coordinates
  const targetX = 150; 
  const targetY = 64;
  const targetZ = -320;

  const mcData = require('minecraft-data')(bot.version);
  const defaultMove = new Movements(bot, mcData);
  bot.pathfinder.setMovements(defaultMove);
  
  // Navigate to coordinates
  bot.pathfinder.setGoal(new goals.GoalBlock(targetX, targetY, targetZ));
});

bot.on('goal_reached', () => {
  console.log("Arrived at the farm location.");
  bot.chat("I am now AFK at the farm. Do not kill me!");
});

// Auto-reconnect if the server restarts or crashes
bot.on('end', () => {
  console.log("Disconnected. Reconnecting in 10 seconds...");
  setTimeout(() => {
    process.exit(1); // Restarts the cloud container to force a rejoin
  }, 10000);
});

const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: ':noblerealms.com', // Server IP
  port: 19132,                  // Bedrock default port
  username: '*Dev7Chowdary',    // Your Minecraft profile name
  offline: false                // Ensures it triggers Microsoft device login auth
});

client.on('spawn', () => {
  console.log("Bot successfully joined NobleRealms Bedrock Server!");
  
  // Wait 5 seconds for world generation streams to buffer, then run commands
  setTimeout(() => {
    // CHANGE "/home farm" to your exact teleport command text if different
    client.queue('text', {
      type: 'chat',
      needs_translation: false,
      source_name: client.username,
      xuid: '',
      platform_chat_id: '',
      message: '/home farm'
    });
    console.log("Teleport command sent directly through Bedrock text layer.");

    // Optional notification message 3 seconds later
    setTimeout(() => {
      client.queue('text', {
        type: 'chat',
        needs_translation: false,
        source_name: client.username,
        xuid: '',
        platform_chat_id: '',
        message: 'I am now AFK at my farm coordinates.'
      });
      console.log("AFK confirmation text sent.");
    }, 3000);

  }, 5000);
});

client.on('error', (err) => {
  console.error("Protocol Error encountered:", err.message);
});

client.on('close', () => {
  console.log("Disconnected from server. Reconnecting in 20 seconds...");
  setTimeout(() => {
    process.exit(1); 
  }, 20000);
});

# RM Bot - WhatsApp Job Notification Bot 🌟📱💼

Welcome to the RM Bot - your ultimate companion for job hunting on WhatsApp! 🎉🤖

Unleash the power of RM Bot and stay one step ahead in the competitive job market. Get ready for a seamless experience as you embark on your professional journey! Here's what makes RM Bot the go-to choice for job seekers:

📣 **Real-time Job Alerts**: Say goodbye to missing out on exciting job opportunities! Receive instant notifications as soon as new jobs are listed on the RM Portal. Stay in the loop and be the first to apply.

📝 **Comprehensive Job Details**: Dive deep into job descriptions, requirements, and application links right from your WhatsApp. Get all the information you need to make informed decisions and seize promising career prospects.

⏰ **Application Reminders**: Never let important deadlines slip away! Set personalized reminders for upcoming job application closing dates. Stay organized and ensure you submit your applications on time.

🌟 **Career Boost**: Let RM Bot be your trusted companion on your journey to success. Whether you're a fresh graduate, experienced professional, or career changer, our bot is here to empower you with valuable job insights and opportunities.

📱 **Connect and Apply**: Take action right from your WhatsApp! Apply for jobs with ease, directly from your device. Save time and effort as you pursue your dream career.

## Deployment Procedure using AWS EC2 🚀

To deploy RM Bot on AWS EC2, follow these steps:

1. **Create an AWS EC2 Instance**: Launch an EC2 instance with the desired configuration, such as the instance type, security group, and key pair. Make sure to choose an instance type suitable for your needs.

2. **Connect to the EC2 Instance**: Use SSH to connect to the EC2 instance using the key pair you created. You can use the following command:

   ```bash
   ssh -i your-key-pair.pem ec2-user@your-instance-public-ip
   ```

3. **Install Node.js**: Install Node.js on the EC2 instance by running the following commands:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   source ~/.bashrc
   nvm install node
   ```

4. **Install MongoDB**: Install MongoDB on the EC2 instance by following the MongoDB installation guide. You can choose the appropriate method for your instance's operating system.

5. **Clone the RM Bot Repository**: Clone the RM Bot repository from GitHub onto your EC2 instance using the following command:

   ```bash
   git clone https://github.com/your-username/rm-bot.git
   ```

6. **Install Dependencies**: Navigate to the RM Bot directory and install the required dependencies by running the following command:

   ```bash
   cd rm-bot
   npm install
   ```

7. **Configure Environment Variables**: Set up the necessary environment variables for the RM Bot. This may include database connection details, API keys, and other configurations. Create a `.env` file in the root directory and specify the required variables.

8. **Start the Bot**: Start the RM Bot application by running the following command:

   ```bash
   npm start
   ```

9. **Configure Webhooks**: Set up webhooks or tunneling to receive incoming messages and notifications on your WhatsApp number. Refer to the documentation of your chosen WhatsApp API provider for detailed instructions.

Congratulations! Your RM Bot is now deployed on AWS EC2 and ready to revolutionize the way job seekers find and apply for jobs on WhatsApp!

## Tech Stack 🛠️

RM Bot is built using the following

 technologies:

- ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) Node.js: Server-side JavaScript runtime environment.
- ![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png) MongoDB: NoSQL database for storing job and user data.
- ![AWS EC2](https://img.icons8.com/color/48/000000/amazon-web-services.png) AWS EC2: Cloud-based virtual machine for hosting the bot.

Feel free to explore and enhance the capabilities of RM Bot with this powerful tech stack!

Stay connected, stay informed, and let RM Bot revolutionize the way you find and apply for jobs! 🌟📱💼

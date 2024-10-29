/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = 'AIzaSyAgGD4n0GSbYj9elJVJC3RT3GExysZOsNc';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
   export const GenerateIdeaAI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "\"Generate an analysis of the following business idea, focusing on its strengths, weaknesses, and key areas to focus on for improvement.\n\nBusiness Idea: [Insert your business idea here, e.g., 'A mobile app that connects users with local service providers such as plumbers, electricians, and cleaners.']\n\nPlease provide:\n\nStrengths: Highlight the advantages of this idea, including its potential market appeal, unique value proposition, or operational benefits.\n\nWeaknesses: Identify any potential challenges or limitations the idea might face, such as market saturation, technical difficulties, or scaling problems.\n\nKey Areas to Focus On: Suggest critical areas that need attention for success, such as product development, marketing strategy, customer acquisition, or competition management.\nin JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"business_idea\": \"A mobile app that connects users with local service providers such as plumbers, electricians, and cleaners.\",\n  \"analysis\": {\n    \"strengths\": [\n      \"Large potential market: The need for home services is ubiquitous and consistent across various demographics.\",\n      \"Convenience and accessibility: The app offers a user-friendly platform for booking services on demand, eliminating the need for traditional search methods.\",\n      \"Cost-effectiveness: The app can connect users with competitive pricing from multiple service providers, promoting transparency and savings.\",\n      \"Increased service provider visibility: The app provides a platform for local service providers to expand their reach and attract new customers.\",\n      \"Potential for additional features: The app can be expanded to include features like online payments, scheduling, and customer reviews, enhancing user experience.\",\n      \"Data-driven insights: The app can collect user data to analyze service demand, identify popular providers, and personalize user experience.\",\n      \"Scalability: The app can be scaled to accommodate growth in both user base and service provider network.\"\n    ],\n    \"weaknesses\": [\n      \"Market saturation: Existing players in the home services marketplace may pose competition.\",\n      \"Customer acquisition cost: Attracting and retaining users in a crowded market might require significant marketing efforts.\",\n      \"Quality control: Ensuring the reliability and professionalism of service providers can be challenging.\",\n      \"Dependence on service provider network: The app's success hinges on a robust and reliable network of qualified service providers.\",\n      \"Technical challenges: Building and maintaining a reliable and secure app platform can be complex and costly.\",\n      \"Security and privacy concerns: Protecting user data and financial information is paramount.\",\n      \"Potential for negative reviews: Negative experiences with service providers can damage the app's reputation.\"\n    ],\n    \"key_areas_to_focus_on\": [\n      \"Product development: Prioritize user experience, app functionality, and seamless integration with service providers.\",\n      \"Marketing strategy: Implement targeted marketing campaigns to reach potential users and service providers, emphasizing the app's unique value proposition.\",\n      \"Customer acquisition: Develop effective strategies for user acquisition, including partnerships, promotions, and referral programs.\",\n      \"Competition management: Analyze competitor offerings and differentiate the app through unique features and pricing strategies.\",\n      \"Quality control: Establish stringent vetting processes for service providers, including background checks and customer feedback mechanisms.\",\n      \"Security and privacy: Implement robust security measures to protect user data and ensure compliance with relevant regulations.\"\n    ]\n  }\n}\n```"},
          ],
        },
      ],
    });
    export const GenerateRoadMap = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a high-quality roadmap in JSON format for the following business idea: service providing app. Each item in the roadmap should include:\n\nid: Step number (starting from 1).\ntitle: Phase of development (e.g., Market Research, Business Plan).\ndescription: Detailed explanation of the phase’s purpose and goals.\nrequirements: A single, comma-separated string of resources, tools, or actions needed for that phase.\nstatus: Set to 'on progress' for each item.\nProvide the roadmap in JSON format, covering all essential phases from initial research to product launch, with each phase status set to 'on progress'."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"id\": 1,\n    \"title\": \"Market Research\",\n    \"description\": \"Identify the target audience, analyze existing competitors, assess market demand, and determine potential business model.\",\n    \"requirements\": \"Market research tools, competitor analysis, surveys, interviews, data analysis\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 2,\n    \"title\": \"Business Plan Development\",\n    \"description\": \"Create a detailed business plan outlining the service offering, revenue model, marketing strategy, financial projections, and operational plan.\",\n    \"requirements\": \"Business plan template, financial modeling tools, market research data, team expertise\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 3,\n    \"title\": \"Minimum Viable Product (MVP) Development\",\n    \"description\": \"Build a basic version of the app with core features to test and validate the service concept with early users.\",\n    \"requirements\": \"Software development team, project management tools, design resources, testing devices\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 4,\n    \"title\": \"Early User Testing and Feedback\",\n    \"description\": \"Gather feedback from a small group of beta users to identify usability issues, gather feature requests, and refine the service offering.\",\n    \"requirements\": \"Beta testing platform, communication channels, user feedback analysis tools\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 5,\n    \"title\": \"App Refinement and Enhancement\",\n    \"description\": \"Incorporate user feedback, improve user experience, enhance features, and address any technical issues based on beta testing results.\",\n    \"requirements\": \"Software development team, design resources, testing devices, user feedback analysis tools\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 6,\n    \"title\": \"Marketing and Launch Strategy\",\n    \"description\": \"Develop a comprehensive marketing plan to reach the target audience, promote the app, and drive user acquisition.\",\n    \"requirements\": \"Marketing budget, social media platforms, content creation tools, PR outreach, app store optimization\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 7,\n    \"title\": \"App Launch and Initial User Growth\",\n    \"description\": \"Release the app on app stores and initiate marketing efforts to attract initial users and build momentum.\",\n    \"requirements\": \"App store submission process, marketing campaign execution, user onboarding materials\",\n    \"status\": \"on progress\"\n  },\n  {\n    \"id\": 8,\n    \"title\": \"Continuous Improvement and Growth\",\n    \"description\": \"Monitor user engagement, gather feedback, implement improvements, and expand the service offering based on market demand and user needs.\",\n    \"requirements\": \"Analytics tools, user feedback channels, software development team, marketing budget\",\n    \"status\": \"on progress\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  
  
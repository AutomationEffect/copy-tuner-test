
import { EdictsSystem } from '@/types';

export const edictsSystem: EdictsSystem = {
  pillars: [
    {
      id: 1,
      name: "Clarity & Readability",
      description: "Ensure your copy is easily digestible and understood by your target audience",
      edicts: [
        {
          id: 1,
          pillar_id: 1,
          name: "Short Sentences",
          description: "Keep most sentences under 20 words",
          example: "Use brief sentences. They pack punch. Readers stay engaged.",
          threshold: 80,
          validator_type: "client"
        },
        {
          id: 2,
          pillar_id: 1,
          name: "Readability Level",
          description: "Keep the copy at 6th-8th grade reading level",
          example: "Simple words work best. Avoid complex terminology when simpler options exist.",
          threshold: 85,
          validator_type: "client"
        },
        {
          id: 3,
          pillar_id: 1,
          name: "Structure & Format",
          description: "Use short paragraphs, bullet points, and clear sections",
          example: "Break text into digestible chunks.\n\n• Use bullets for lists\n• Keep paragraphs short\n• Include subheadings",
          threshold: 90,
          validator_type: "both"
        },
        {
          id: 4,
          pillar_id: 1,
          name: "Active Voice",
          description: "Use active voice instead of passive voice",
          example: "Active: 'The product increases metabolism'\nPassive: 'Metabolism is increased by the product'",
          threshold: 80,
          validator_type: "both"
        },
        {
          id: 5,
          pillar_id: 1,
          name: "Comma Usage",
          description: "Use commas judiciously to improve flow and readability",
          example: "For clear, effective copy, use commas to separate ideas, create pauses, and improve rhythm.",
          threshold: 75,
          validator_type: "client"
        }
      ]
    },
    {
      id: 2,
      name: "Persuasion & Emotion",
      description: "Trigger emotional responses that drive action",
      edicts: [
        {
          id: 6,
          pillar_id: 2,
          name: "Emotional Triggers",
          description: "Include words and phrases that evoke strong emotions",
          example: "Transform your life with the solution you've been desperately searching for.",
          threshold: 85,
          validator_type: "both"
        },
        {
          id: 7,
          pillar_id: 2,
          name: "Pain & Solution",
          description: "Clearly identify pain points and position your product as the solution",
          example: "Tired of struggling with weight that won't budge? Our system unlocks your body's natural fat-burning potential.",
          threshold: 90,
          validator_type: "both"
        },
        {
          id: 8,
          pillar_id: 2,
          name: "Specificity",
          description: "Use specific numbers, testimonials, and results rather than generalizations",
          example: "Over 10,317 customers lost an average of 17.3 pounds in 30 days.",
          threshold: 80,
          validator_type: "both"
        },
        {
          id: 9,
          pillar_id: 2,
          name: "Credibility Elements",
          description: "Include trust signals, testimonials, and proof",
          example: "Dr. Sarah Miller, leading nutritionist at Boston Medical Center, confirms these results in her peer-reviewed study.",
          threshold: 85,
          validator_type: "both"
        },
        {
          id: 10,
          pillar_id: 2,
          name: "Risk Reversal",
          description: "Remove barriers to purchase by addressing objections and offering guarantees",
          example: "Try it risk-free with our 60-day money-back guarantee. If you're not completely satisfied, we'll refund every penny. No questions asked.",
          threshold: 90,
          validator_type: "both"
        }
      ]
    },
    {
      id: 3,
      name: "Engagement & Flow",
      description: "Maintain reader interest from start to finish",
      edicts: [
        {
          id: 11,
          pillar_id: 3,
          name: "Opening Hook",
          description: "Start with a compelling hook that grabs attention",
          example: "What if I told you that the weight loss industry has been lying to you for decades?",
          threshold: 90,
          validator_type: "both"
        },
        {
          id: 12,
          pillar_id: 3,
          name: "Transitional Phrases",
          description: "Use transitions to maintain flow between ideas",
          example: "But that's not all... Here's where it gets interesting... And the best part?",
          threshold: 80,
          validator_type: "both"
        },
        {
          id: 13,
          pillar_id: 3,
          name: "Pattern Interrupts",
          description: "Break up copy with unexpected elements to maintain attention",
          example: "Wait—before you continue reading, I need you to understand something crucial...",
          threshold: 75,
          validator_type: "both"
        },
        {
          id: 14,
          pillar_id: 3,
          name: "Storytelling",
          description: "Use narrative elements to engage and relate to the reader",
          example: "When Sarah first came to us, she was skeptical. Three diets had failed her. But within weeks...",
          threshold: 85,
          validator_type: "ai"
        },
        {
          id: 15,
          pillar_id: 3,
          name: "Conversational Tone",
          description: "Write as if speaking directly to one person",
          example: "I know exactly how you feel. I've been there too, standing in front of the mirror, wondering if anything will ever work.",
          threshold: 85,
          validator_type: "both"
        }
      ]
    },
    {
      id: 4,
      name: "Call to Action & Conversion",
      description: "Drive readers to take the desired action",
      edicts: [
        {
          id: 16,
          pillar_id: 4,
          name: "Clear CTA",
          description: "Include explicit calls to action with strong command verbs",
          example: "Click here to claim your risk-free trial now!",
          threshold: 90,
          validator_type: "both"
        },
        {
          id: 17,
          pillar_id: 4,
          name: "Urgency & Scarcity",
          description: "Create reasonable urgency without false claims",
          example: "Limited to the first 500 customers. 327 spots already claimed!",
          threshold: 80,
          validator_type: "both"
        },
        {
          id: 18,
          pillar_id: 4,
          name: "Value Proposition",
          description: "Clearly articulate the unique value and benefits",
          example: "Unlike other solutions that only [competitor weakness], our system [unique advantage] to deliver [key benefit].",
          threshold: 85,
          validator_type: "both"
        },
        {
          id: 19,
          pillar_id: 4,
          name: "Future Pacing",
          description: "Help the reader visualize a positive future after using your product",
          example: "Imagine waking up 30 days from now, looking in the mirror, and seeing a noticeably slimmer reflection staring back at you.",
          threshold: 80,
          validator_type: "ai"
        },
        {
          id: 20,
          pillar_id: 4,
          name: "Decision Simplification",
          description: "Make the decision process simple and clear",
          example: "You have two choices: Continue struggling with approaches that haven't worked, or try the proven system that's transformed thousands of lives.",
          threshold: 85,
          validator_type: "both"
        },
        {
          id: 21,
          pillar_id: 4,
          name: "Post-Purchase Reassurance",
          description: "Reinforce the decision and reduce buyer's remorse",
          example: "After you click the button, you'll receive immediate access to everything you need, with our team standing by to support your journey.",
          threshold: 75,
          validator_type: "ai"
        }
      ]
    }
  ]
};

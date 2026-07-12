import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt, goal, weight } = await req.json()

    // Simulate an AI processing delay for realism (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const p = prompt.toLowerCase()
    
    // Gym-bro personality prefix
    const prefixes = [
      "Alright let's crush it! 💪 ",
      "Listen up warrior, here's the plan to get those gains! 🔥 ",
      "Boom! Time to dial in that nutrition! 🚀 ",
      "Let's get you absolutely shredded! ⚡ ",
    ]
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]

    let response = ""

    // Smart Keyword Detection (Hinglish / WhatsApp Language Support)
    if (p.includes("veg") || p.includes("plant") || p.includes("ghas phus")) {
      response = "Since you're going plant-based, we gotta make sure you hit your protein goals. Load up on paneer, tofu, lentils, and whey protein if you consume dairy. For breakfast, a massive bowl of oats with peanut butter and berries. Lunch? Soybean chunks with brown rice and spinach. Dinner can be grilled paneer or tofu with broccoli and a sweet potato. Keep crushing it!"
    } else if (p.includes("muscle") || p.includes("bulk") || p.includes("gain") || p.includes("bada karna") || p.includes("mass")) {
      response = "You want to pack on serious mass? We need you in a caloric surplus! Eat big to get big. Eggs and oats for breakfast. Chicken breast or paneer with rice for lunch. Pre-workout? Banana and peanut butter. Post-workout? A massive protein shake. Dinner should be heavy: steak or fish, potatoes, and veggies. Don't skip meals!"
    } else if (p.includes("loss") || p.includes("cut") || p.includes("shred") || p.includes("patla") || p.includes("wazan kam")) {
      response = "Time to lean out and get shredded! We're putting you in a caloric deficit but keeping protein high so you don't lose muscle. Breakfast: Egg whites and spinach. Lunch: Grilled chicken salad with olive oil. Snack: Greek yogurt. Dinner: Baked fish or chicken with asparagus. Drink a ton of water and keep that cardio up!"
    } else if (p.includes("fast") || p.includes("quick") || p.includes("jaldi")) {
      response = "Need something quick? Meal prep is your best friend. Boil a dozen eggs on Sunday. Keep cooked chicken breast in the fridge. For a 5-minute meal, throw 2 scoops of whey, a banana, milk, and peanut butter in a blender. Boom. Instant 50g of protein. No excuses!"
    } else if (p.includes("hi") || p.includes("hey") || p.includes("hello") || p.includes("kya haal") || p.includes("kaise ho")) {
      response = "Kya haal hai bhai! Ek number! I'm your AI Nutritionist. Tell me your fitness goals or what you want to eat, and I'll give you a solid meal plan to get those gains! 💪"
    } else {
      response = `Based on your weight of ${weight}kg and goal to conquer ${goal.replace('_', ' ')}, you need a balanced approach. Focus on whole foods: lean meats, complex carbs like sweet potatoes, and healthy fats like avocados and nuts. Stay hydrated, hit your protein target (aim for 2g per kg of bodyweight), and train like a beast! What else do you want to know?`
    }

    return NextResponse.json({ reply: prefix + response })

  } catch (error) {
    return NextResponse.json({ reply: "Whoops, the AI server just dropped a heavy dumbbell. Try asking again!" }, { status: 500 })
  }
}

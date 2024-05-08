const mealPlanData = [
    {
        meal: 'Meal1',
        description: 'Start your day with a healthy and filling breakfast. This meal features a hearty bowl of oatmeal topped with fresh fruits, nuts, and a drizzle of honey. To prepare, simply cook the oats (50g) with water (200ml) or milk (200ml) until creamy, then add the following toppings:',
        ingredients: [
            'Fresh fruits (e.g., bananas, berries)',
            'Nuts (e.g., almonds, walnuts)',
            'Honey (15g)'
        ]
    },
    {
        meal: 'Meal2',
        description: 'Enjoy a light and refreshing lunch with a grilled chicken salad. This dish includes tender grilled chicken breast served on a bed of mixed greens, alongside juicy tomatoes, crisp cucumbers, and tangy balsamic vinaigrette. To make, grill the chicken breast (150g) until cooked through and assemble the salad with the following ingredients:',
        ingredients: [
            'Mixed greens (100g)',
            'Tomatoes (50g)',
            'Cucumbers (50g)',
            'Balsamic vinaigrette (30ml)'
        ]
    },
    {
        meal: 'Meal3',
        description: 'For dinner, indulge in a delicious baked salmon with quinoa and steamed vegetables. This meal is packed with omega-3 fatty acids and essential nutrients. To prepare, season the salmon fillets (200g) with herbs and spices, then bake until flaky. Serve with the following sides:',
        ingredients: [
            'Quinoa (100g)',
            'Assorted vegetables (e.g., broccoli, carrots) (200g)'
        ]
    }
];

// Function to create HTML elements for displaying meal plan and recipes
function renderMealPlan() {
    const mealPlanContainer = document.getElementById('mealPlanContainer');

    mealPlanData.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('card');
        mealCard.innerHTML = `
            <div class="card-content">
                <h2>${meal.meal}</h2>
                <p>${meal.description}</p>
                <ul>
                    ${meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        `;
        mealPlanContainer.appendChild(mealCard);
    });
}

// Call the function to render the meal plan when the page loads
window.onload = renderMealPlan;
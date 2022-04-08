const mongoose = require('mongoose');
const config = require("./config");
const Cocktail = require('./models/Cocktail');
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [USER, ADMIN] = await User.create({
        avatar: null,
        displayName: 'user',
        email: 'user@gmail.com',
        password: 'user',
        token: 'user',
        role: 'user',
    }, {
        avatar: null,
        displayName: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        token: 'admin',
        role: 'admin'
    });


    await Cocktail.create({
        user: USER,
        name: 'Cosmopolitan',
        recipe: 'Add the vodka, Cointreau, lime juice, and cranberry juice cocktail into a ' +
            'shaker with ice and shake until well-chilled. Strain into a chilled cocktail glass.' +
            ' Garnish with a lime wedge.'
        ,
        isPublished: true,
        ingredients: [{
            ingredientName: 'citron vodka',
            ingredientAmount: '11/2 ounce',
        }, {
            ingredientName: 'cranberry juice cocktail',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        },],
        image: 'cosmopolitan.webp'
    }, {
        user: USER,
        name: 'Painkiller',
        recipe: 'Add the rum, pineapple juice, orange juice and cream of coconut to a shaker with ice and shake vigorously but briefly to combine. ' +
            'Strain into a hurricane glass or snifter over crushed ice. ' +
            'Garnish with freshly grated nutmeg and a pineapple wedge. Serve with a straw.',
        isPublished: true,
        ingredients: [{
            ingredientName: 'Pusser’s rum',
            ingredientAmount: '2 ounces',
        }, {
            ingredientName: 'pineapple juice',
            ingredientAmount: '4 ounces',
        }, {
            ingredientName: 'orange juice, freshly squeezed',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'cream of coconut',
            ingredientAmount: '1 ounce',
        }],
        image: 'painkiller.webp'
    }, {
        user: USER,
        name: 'Silver Fizz',
        recipe: 'Add the sugar and lemon juice into a shaker and stir. ' +
            'Add the gin and the egg white and vigorously dry-shake (without ice). ' +
            'Add ice and shake again until well-chilled.' +
            'Strain into a chilled 6- to 8-ounce Collins glass.' +
            'Top with the club soda.',
        isPublished: true,
        ingredients: [{
            ingredientName: 'white granulated sugar',
            ingredientAmount: '1 teaspoon',
        }, {
            ingredientName: 'lemon juice, freshly squeezed',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: 'London Dry or Old Tom gin',
            ingredientAmount: '2 ounces',
        }, {
            ingredientName: 'organic egg white (about 1 ounce)',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'club soda, chilled, to top',
            ingredientAmount: '1 to 2 ounces',
        }],
        image: 'silver-fizz.webp'
    }, {
        user: ADMIN,
        name: `Missionary's-downfall`,
        recipe: 'Add all ingredients into a blender with 3/4 cup of ice and blend for about 20 seconds. ' +
            'Pour into a Collins glass. ' +
            'Garnish with a mint sprig and a pineapple wedge.' +
            'Serve with a straw.',
        isPublished: true,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'missionarys-downfall.webp'
    }, {
        user: ADMIN,
        name: 'Mat Tai',
        recipe: 'Add the white rum, curaçao, lime juice and orgeat into a shaker with crushed ice and shake lightly (about 3 seconds). ' +
            'Pour into a double rocks glass. ' +
            'Float the dark rum over the top.' +
            'Garnish with a lime wheel and mint sprig.',
        isPublished: true,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'mai-tai.webp'
    }, {
        user: ADMIN,
        name: 'Margarita',
        recipe: 'Add tequila, orange liqueur, lime juice and agave syrup to a cocktail shaker filled with ice, and shake until well-chilled. ' +
            'Strain into a rocks glass over fresh ice. ' +
            'Float the dark rum over the top. ' +
            'Garnish with a lime wheel and kosher salt rim (optional).',
        isPublished: true,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'margarita.webp'
    }, {
        user: ADMIN,
        name: 'Negroni',
        recipe: 'Add the gin, Campari and sweet vermouth to a mixing glass filled with ice, and stir until well-chilled. ' +
            'Strain into a rocks glass filled with large ice cubes. ' +
            'Garnish with an orange peel. ',
        isPublished: true,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'negroni.webp'
    }, {
        user: ADMIN,
        name: 'Dry Martini',
        recipe: 'Add the gin, Campari and sweet vermouth to a mixing glass filled with ice, and stir until well-chilled. ' +
            'Strain into a rocks glass filled with large ice cubes. ' +
            'Garnish with an orange peel. ',
        isPublished: true,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'dry-martini.webp'
    }, {
        user: ADMIN,
        name: 'Longines',
        recipe: 'Add the gin, Campari and sweet vermouth to a mixing glass filled with ice, and stir until well-chilled. ' +
            'Strain into a rocks glass filled with large ice cubes. ' +
            'Garnish with an orange peel. ',
        isPublished: false,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'longines.webp'
    }, {
        user: ADMIN,
        name: 'Pink Lady',
        recipe: 'Add the gin, Campari and sweet vermouth to a mixing glass filled with ice, and stir until well-chilled. ' +
            'Strain into a rocks glass filled with large ice cubes. ' +
            'Garnish with an orange peel. ',
        isPublished: false,
        ingredients: [{
            ingredientName: 'white rum',
            ingredientAmount: '1 ounce',
        }, {
            ingredientName: 'creme de peche',
            ingredientAmount: '1/2 ounce',
        }, {
            ingredientName: '1 large fresh pineapple chunk',
            ingredientAmount: 'about 1/4 cup',
        }, {
            ingredientName: 'lime juice, freshly squeezed',
            ingredientAmount: '3/4 ounce',
        }, {
            ingredientName: 'honey syrup',
            ingredientAmount: '1/2 ounce',
        }],
        image: 'pink-lady.webp'
    })

    await mongoose.connection.close();
}


run().catch(e => console.log(e));
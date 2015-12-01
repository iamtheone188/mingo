angular.module('starter.services', [])

.factory('Feelings', function() {
  //Hardcoded feelings
  var feelings = [{
    id: 0,
    feeling: 'adventurous'
  },
  {
    id: 1,
    feeling: 'artsy'
  },
  {
    id: 2,
    feeling: 'curious'
  },
  {
    id: 3,
    feeling: 'zen'
  },
  {
    id: 4,
    feeling: 'nostalgic'
  },
  {
    id: 5,
    feeling: 'nerdy'
  },
  {
    id: 6,
    feeling: 'lazy'
  },
  {
    id: 7,
    feeling: 'romantic'
  },
  {
    id: 8,
    feeling: 'active'
  },
  {
    id: 9,
    feeling: 'social'
  }];

  return {
    all: function() {
      return feelings;
    },
    getRange: function(startId, range) {
      if(range > feelings.length)
        return feelings;
      else if(startId+range > feelings.length)
        return feelings.slice(0, range);
      else
        return feelings.slice(startId, startId+range);
    },
    get: function(feelingId) {
      for (var i = 0; i < feelings.length; i++) {
        if (feelings[i].id === parseInt(feelingId)) {
          return feelings[i];
        }
      }
      return null;
    }
  };
})

.factory('AttractionsParis', function() {
  //Hardcoded attractions
  var attractions = [{
    id: 0,
    attraction: 'Eiffel Tower',
    activity: 'Climb to the top of the Eiffel Tower',
    imageUrl: './img/paris0.jpg',
    description: 'Once the tallest structure in the world, the Eiffel Tower is probably Europe\'s best known landmark and Paris\'s most famous symbol.',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'
  },
  {
    id: 1,
    attraction: 'Musee d\'Orsay',
    activity: 'Explore Musee d\'Orsay',
    imageUrl: './img/paris1.jpg',
    description: 'Housed in a Belle Époque railway station along the Left Bank, the Musée d\'Orsay boasts the world\'s largest collection of Impressionist and post-Impressionist works.',
    address: '1 Rue de la Legion d\'Honneur, 75007 Paris, France'
  },
  {
    id: 2,
    attraction: 'Centre Pompidou',
    activity: 'Explore the Centre Pompidou',
    imageUrl: './img/paris2.jpg',
    description: 'The Centre Pompidou is one of the most visited cultural sites in Paris. If you appreciate art moderne, you\'ll love the Pompidou.',
    address: 'Place Georges-Pompidou, 75004 Paris, France'
  },
  {
    id: 3,
    attraction: 'Musee Rodin',
    activity: 'Visit the Musee Rodin',
    imageUrl: './img/paris3.jpg',
    description: 'A hidden jewel in the city, the Musée Rodin is actually the former residence of famed 19th century sculptor Auguste Rodin and now houses Rodin\'s emotive sculptures.',
    address: '79 Rue de Varenne, 75007 Paris, France'
  },
  {
    id: 4,
    attraction: 'L\'Entrepot',
    activity: 'Watch an old French movie at L\'Entrepot',
    imageUrl: './img/paris4.jpg',
    description: 'L\'entrepot is a biosphere of entertainment in Paris. Visitors often come for the classic Cinema, as well as the numerous concerts, and art expositions.',
    address: '7 Rue Francis de Pressensé, 75014 Paris, France'
  },
  {
    id: 5,
    attraction: 'Paris Catacombs',
    activity: 'Explore the Paris Catacombs',
    imageUrl: './img/paris5.jpg',
    description: 'The solemn, skull-and-boned lined tunnels of the Catacombs weave beneath the heart of the City of Love, beckoning to visitors with an interest in the departed.',
    address: '1 Avenue du Colonel Henri Rol-Tanguy, 75014 Paris, France'
  },
  {
    id: 6,
    attraction: 'Jardin du Luxembourg',
    activity: 'Lounge at Jardin du Luxembourg',
    imageUrl: './img/paris6.jpg',
    description: 'Jardin du Luxembourg provides ample space for sunbathing and people-watching.',
    address: '6th arrondissement of Paris, 75006 Paris, France'
  },
  {
    id: 7,
    attraction: 'Canal Saint-Martin',
    activity: 'Walk along Canal Saint-Martin',
    imageUrl: './img/paris7.jpg',
    description: 'There is no finer spot for a romantic stroll or cycle than along the shaded 19th-century tow paths of tranquil Canal Saint-Martin.',
    address: 'Canal Saint-Martin, Paris, France'
  },
  {
    id: 8,
    attraction: 'Foret de Fontainebleau',
    activity: 'Hike through the Foret de Fontainebleau',
    imageUrl: './img/paris8.jpg',
    description: 'Spread over 25,000 hectares, the Forêt de Fontainebleau is a pleasure for nature lovers due to its dense and varied flora and fauna.',
    address: '4, Rue Royale - 77300, Fontainebleau, France'
  },
  {
    id: 9,
    attraction: 'Le Marais',
    activity: 'Explore Le Marais',
    imageUrl: './img/paris9.jpg',
    description: 'Le Marais is one of Paris\' oldest and coolest districts. So cool, in fact, that French writer Victor Hugo called it home.',
    address: 'Le Marais, Paris, France'
  }];

  return {
    all: function() {
      return attractions;
    },
    get: function(attractionId) {
      for (var i = 0; i < attractions.length; i++) {
        if (attractions[i].id === parseInt(attractionId)) {
          return attractions[i];
        }
      }
      return null;
    }
  };
})

.factory('AttractionsSFBay', function() {
  //Hardcoded attractions
    var attractions = [{
      id: 0,
      attraction: 'Alcatraz Island',
      activity: 'Explore Alcatraz Island',
      imageUrl: './img/sfbay0.jpg',
      description: 'Alcatraz Island offers a close-up look at the site of the first lighthouse and US built fort on the West Coast.'
    },
    {
      id: 1,
      attraction: 'Asian Art Museum of San Francisco',
      activity: 'Explore the Asian Art Museum of San Francisco',
      imageUrl: './img/sfbay1.jpg',
      description: 'The Asian Art Museum holds one of the most comprehensive collections of Asian art in the world.'
    },
    {
      id: 2,
      attraction: 'The Exploratorium',
      activity: 'Learn at the Exploratorium',
      imageUrl: './img/sfbay2.jpg',
      description: 'With 600 indoor and outdoor exhibits that cover subjects like outer space, the human body and science, the Exploratorium encourages visitors to don their thinking caps.'
    },
    {
      id: 3,
      attraction: 'Japanese Tea Garden',
      activity: 'Enjoy the Japanese Tea Garden',
      imageUrl: './img/sfbay3.jpg',
      description: 'The tranquil Japanese Tea Garden is a great place to find your bearings and relax.'
    },
    {
      id: 4,
      attraction: 'Cable Car',
      activity: 'Take a ride on a Cable Car',
      imageUrl: './img/sfbay4.jpg',
      description: 'To get the full experience of the San Francisco\'s charm, you\'ll have to hop on board. San Francisco\'s cable car system is the last of its kind in the United States.'
    },
    {
      id: 5,
      attraction: 'California Academy of Sciences',
      activity: 'Explore the California Academy of Sciences',
      imageUrl: './img/sfbay5.jpg',
      description: 'California Academy of Science is home to engaging exhibits and shows, and a fascinating team of scientists and presenters working to explore the diversity of life.'
    },
    {
      id: 6,
      attraction: 'Yerba Buena Gardens',
      activity: 'Lounge at Yerba Buena Gardens',
      imageUrl: './img/sfbay6.jpg',
      description: 'Located in the cultural heart of San Francisco, Yerba Buena Gardens is the perfect place to play, dine, shop or just relax.'
    },
    {
      id: 7,
      attraction: 'The Bay Lights',
      activity: 'Watch the Bay Lights',
      imageUrl: './img/sfbay7.jpg',
      description: 'Marvel at the 25,000 white LEDs dancing and sparkling in this large-scale light installation on the Bay Bridge’s western span.'
    },
    {
      id: 8,
      attraction: 'Lands End',
      activity: 'Explore Lands End',
      imageUrl: './img/sfbay8.jpg',
      description: 'At the northwestern corner of San Francisco, there is a series of stunning views at every turn in Lands End’s wild and windy trail.'
    },
    {
      id: 9,
      attraction: 'Mission District',
      activity: 'Explore the Mission District',
      imageUrl: './img/sfbay9.jpg',
      description: 'The Mission District has attracted San Francisco\'s young bohemian crowd in the past decade, but it\'s still retained its authentic, local Mexican ambiance.'
    }];

  return {
    all: function() {
      return attractions;
    },
    get: function(attractionId) {
      for (var i = 0; i < attractions.length; i++) {
        if (attractions[i].id === parseInt(attractionId)) {
          return attractions[i];
        }
      }
      return null;
    }
  };
});
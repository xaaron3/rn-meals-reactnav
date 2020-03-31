import React from 'react';
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesSceen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
   {
      Categories: {
         screen: CategoriesScreen
      },
      CategoryMeals: {
         screen: CategoryMealsScreen
      },
      MealDetail: MealDetailScreen
   },
   {
      defaultNavigationOptions: {
         headerStyle: {
            backgroundColor:
               Platform.OS === 'android' ? Colors.primaryColor : ''
         },
         headerTintColor:
            Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }
   }
);

const tabScreenConfig = {
   Meals: {
      screen: MealsNavigator,
      navigationOptions: {
         tabBarIcon: tabInfo => {
            return (
               <Ionicons
                  name='ios-restaurant'
                  size={25}
                  color={tabInfo.tintColor}
               />
            );
         }
      }
   },
   Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
         tabBarLabel: 'Favorites!',
         tabBarIcon: tabInfo => {
            return (
               <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            );
         }
      }
   }
};

const MealsFavTabNavigator =
   Platform.OS === 'android'
      ? createMaterialBottomTabNavigator(tabScreenConfig, {
           activeColor: Colors.accentColor,
           shifting: true
        })
      : createBottomTabNavigator(tabScreenConfig, {
           tabBarOptions: {
              activeTintColor: Colors.accentColor
           }
        });

// below, the MealsNavigator is now nested within the MealsFavTabNavigator.
export default createAppContainer(MealsFavTabNavigator);

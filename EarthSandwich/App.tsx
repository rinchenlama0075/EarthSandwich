/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import userInfo from './SampleData/user_info.json';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

function areAntipodal(user1: Coordinates, user2: Coordinates): boolean {
  const user1Antipodal: Coordinates = {
    latitude: -user1.latitude,
    longitude: -user1.longitude
  };

  return (
    user1Antipodal.latitude === user2.latitude &&
    user1Antipodal.longitude === user2.longitude
  );
}

interface User {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface UserPair {
  user1: User;
  user2: User;
}

const UserPairsTable: React.FC<{ users: User[] }> = ({ users }) => {
  const UserPairs: UserPair[] = findAntipodalPairs(users);

  const renderItem = ({ item }: { item: UserPair }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.user1.name}</Text>
      <Text style={styles.cell}>{item.user2.name}</Text>
    </View>
  );;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>User 1</Text>
        <Text style={styles.headerCell}>User 2</Text>
      </View>
      <FlatList
        data={UserPairs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

function findAntipodalPairs(users: User[]): UserPair[] {
  const antipodalPairs: UserPair[] = [];

  for (let i = 0; i < users.length - 1; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const userA = users[i];
      const userB = users[j];

      if (areAntipodal(userA.location, userB.location)) {
        antipodalPairs.push({ user1: userA, user2: userB });
      }
    }
  }

  return antipodalPairs;
}



function DisplayBuddies(): JSX.Element{
  // goes through the user list
  // finds user pairs that are antipodal
  // display pairs

  var antiPodalUsers = findAntipodalPairs(userInfo.users)
  console.log("AntiPodal Users: ")
  console.log(antiPodalUsers[0])
  
  return(

    <View>
      <Text>
        Display Buddies here
      </Text>
    {userInfo.users.map(user => (
      <Section title={user.name} key={user.id}>{user.name}</Section>
    ))}
    </View>

  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <DisplayBuddies />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}

      <UserPairsTable users={userInfo.users}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default App;

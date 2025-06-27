import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { fetchEvents, Event } from '../../firebase/firestoreService';
import COLORS from '../../constants/Colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/Typography';
import IMAGES from '../../constants/Images';
import Spacer from '../../components/Spacer';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({ item }: { item: Event }) => {
    const date = item.scheduledFor.toDate();
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const finalDate = `${formattedDate}. ${formattedTime}`;
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.iconUrl }}
          style={styles.banner}
          resizeMode="stretch"
        />
        <View style={styles.cardBody}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.font_white,
              paddingVertical: 5,
              alignItems: 'center',
            }}
          >
            <View style={styles.iconView}>
              <Image source={IMAGES.CALENDAR} />
            </View>
            <Spacer width={5} />
            <Text style={styles.meta}>
              {item.scheduledFor ? finalDate : 'No date'}
            </Text>
          </View>
          <Spacer height={5} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.iconView}>
              <Image source={IMAGES.LOCATION} />
            </View>
            <Spacer width={5} />
            <Text style={styles.meta}>{item.location}</Text>
          </View>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() =>
              navigation.navigate('Chat', {
                eventId: item.id,
                eventTitle: item.title,
              })
            }
          >
            <Text style={styles.chatText}>Chat Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading)
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={COLORS.primary}
      />
    );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        elevation: 4,
      }}
    >
      <TextInput
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  list: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
  },
  banner: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 16,
  },
  eventTitle: {
    fontSize: FONT_SIZE.LARGE,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.black,
    marginBottom: 6,
  },
  meta: {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.gray_black,
  },
  chatButton: {
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%',
  },
  chatText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
  searchBar: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 16,
    borderRadius: 10,
    fontSize: FONT_SIZE.MEDIUM,
    borderWidth: 1,
    borderColor: COLORS.font_white,
  },
  iconView: {
    backgroundColor: COLORS.gray,
    padding: 5,
    borderRadius: 10,
  },
});

export default HomeScreen;

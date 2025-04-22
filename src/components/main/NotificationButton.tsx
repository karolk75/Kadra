import { ThemeColors } from "@/constants/ThemeColors";
import { useNotifications } from "@/hooks/useNotifications";
import { useAppSelector } from "@/store";
import { selectNotifications } from "@/store/slices/notificationsSlice";
import BellIcon from "@/svg/main/bell";
import { Notification } from "@/types/Notification";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scale, verticalScale } from "react-native-size-matters";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

export default function NotificationButton() {
  const notifications = useAppSelector(selectNotifications);
  const { fetchNotifications, updateNotificationsAsRead } = useNotifications();

  const [modalVisible, setModalVisible] = useState(false);

  const bellScale = useSharedValue(1);
  const bellRotate = useSharedValue(0);

  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread count whenever notifications change from Redux
  useEffect(() => {
    const unreadNotifications =
      notifications?.filter((notification) => !notification.isRead) || [];

    setUnreadCount(unreadNotifications.length);
  }, [notifications]);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications]),
  );

  const bellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: bellScale.value },
        { rotate: `${bellRotate.value}deg` },
      ],
    };
  });

  const animateBellButton = () => {
    // Reset values first
    bellScale.value = 1;
    bellRotate.value = 0;

    // Sequence: slightly shrink → grow a bit larger → back to normal
    bellScale.value = withSequence(
      withTiming(0.9, { duration: 60 }),
      withSpring(1.1, { damping: 12, stiffness: 180, mass: 0.6 }),
      withSpring(1, { damping: 12, stiffness: 180, mass: 0.6 }),
    );

    // Add a very slight wobble effect
    bellRotate.value = withSequence(
      withTiming(2, { duration: 120 }),
      withTiming(-2, { duration: 140 }),
      withTiming(0, { duration: 120 }),
    );

    // Open modal and mark notifications as read
    setModalVisible(true);

    if (unreadCount > 0) {
      // Immediately set unread count to 0 as we're marking all as read
      setUnreadCount(0);

      updateNotificationsAsRead(
        notifications.map((notification) => notification.id),
      );
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    // Choose icon based on notification type
    let iconName:
      | "information-circle-outline"
      | "chatbubble-outline"
      | "calendar-outline" = "information-circle-outline";

    if (item.type === "MESSAGE") {
      iconName = "chatbubble-outline";
    } else if (item.type === "APPOINTMENT") {
      iconName = "calendar-outline";
    }

    return (
      <TouchableOpacity
        onPress={() => console.log("Notification clicked:", item)}
        style={styles.item}
        className="flex-row items-center justify-between border-b border-[#E8E8E8]"
      >
        <View className="flex-row items-center flex-1">
          <Ionicons
            name={iconName}
            size={scale(20)}
            color={ThemeColors.GOLD}
            style={styles.icon}
          />
          <View className="flex-1">
            <View style={styles.notificationHeader}>
              <Text
                style={styles.notificationTitle}
                className="font-poppins-semibold"
              >
                {item.title}
              </Text>
              <Text
                style={styles.notificationTime}
                className="font-poppins-regular"
              >
                {formatDistanceToNow(new Date(item.createdAt), {
                  locale: pl,
                  addSuffix: true,
                })}
              </Text>
            </View>
            <Text
              style={styles.notificationMessage}
              className="font-poppins-regular"
            >
              {item.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={animateBellButton}>
        <Animated.View style={bellAnimatedStyle}>
          <View style={styles.bellContainer}>
            <BellIcon width={28} height={28} />
            {unreadCount > 0 && (
              <View style={styles.notificationDot}>
                {unreadCount > 1 && (
                  <Text style={styles.notificationCount}>{unreadCount}</Text>
                )}
              </View>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="w-11/12 h-4/6 bg-white rounded-3xl overflow-hidden"
            style={styles.modalView}
          >
            {/* Header */}
            <View
              style={styles.header}
              className="flex-row items-center justify-between border-b border-[#E8E8E8]"
            >
              <View style={styles.backButton} className="items-center" />
              <Text
                style={styles.title}
                className="flex-1 text-center font-poppins-bold"
              >
                Powiadomienia
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                className="items-center"
              >
                <Ionicons
                  name="close"
                  size={scale(24)}
                  color={ThemeColors.BRICK_RED}
                />
              </TouchableOpacity>
            </View>

            {/* List container */}
            <View className="flex-1">
              {notifications.length > 0 ? (
                <FlatList
                  data={notifications}
                  renderItem={renderNotificationItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={true}
                />
              ) : (
                <View style={styles.emptyContainer} className="items-center">
                  <Text
                    style={styles.emptyText}
                    className="font-poppins-regular"
                  >
                    Brak powiadomień
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bellContainer: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: ThemeColors.BRICK_RED,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  notificationCount: {
    color: "#FFFFFF",
    fontSize: scale(10),
    fontWeight: "bold",
  },
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  title: {
    fontSize: scale(18),
    color: ThemeColors.BLUE_GRAY,
  },
  backButton: {
    padding: scale(4),
    width: scale(32),
  },
  closeButton: {
    padding: scale(4),
    width: scale(32),
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(20),
  },
  item: {
    paddingVertical: verticalScale(12),
  },
  icon: {
    marginRight: scale(12),
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(3),
  },
  notificationTitle: {
    fontSize: scale(14),
    color: ThemeColors.BLUE_GRAY,
  },
  notificationTime: {
    fontSize: scale(10),
    color: "#A1A4B2",
  },
  notificationMessage: {
    fontSize: scale(12),
    color: "#2D3142",
  },
  emptyContainer: {
    padding: verticalScale(20),
  },
  emptyText: {
    fontSize: scale(16),
    color: ThemeColors.BLUE_GRAY,
    marginVertical: verticalScale(20),
  },
});

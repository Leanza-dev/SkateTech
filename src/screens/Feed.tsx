import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import { Zap } from 'lucide-react-native';
import { SpotCard } from '../components/SpotCard';
import { MOCK_SPOTS, Spot } from '../data/spots';
import { COLORS, FONT, SPACING } from '../theme';

const FeedHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerTop}>
      <View>
        <Text style={styles.greeting}>Bem-vindo de volta 🛹</Text>
        <Text style={styles.headerTitle}>Picos Próximos</Text>
      </View>
      <View style={styles.liveIndicator}>
        <Zap size={12} color={COLORS.brand} fill={COLORS.brand} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </View>
    <Text style={styles.subTitle}>{MOCK_SPOTS.length} picos encontrados na sua região</Text>
  </View>
);

export function SpotFeed() {
  const handleSpotPress = useCallback((spot: Spot) => {
    console.log('[SkateTech] Spot pressed:', spot.id, spot.name);
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Spot>) => (
      <SpotCard spot={item} onPress={handleSpotPress} />
    ),
    [handleSpotPress],
  );

  const keyExtractor = useCallback((item: Spot) => item.id, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <FlatList<Spot>
        data={MOCK_SPOTS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={FeedHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        windowSize={7}
        getItemLayout={(_data, index) => ({ length: 316, offset: 316 * index, index })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    gap: SPACING.xs,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: FONT.sizes.sm,
    color: COLORS.textMuted,
    fontWeight: FONT.weights.medium,
  },
  headerTitle: {
    fontSize: FONT.sizes['3xl'],
    fontWeight: FONT.weights.black,
    color: COLORS.textPrimary,
    letterSpacing: -1,
    lineHeight: 34,
  },
  subTitle: {
    fontSize: FONT.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.brand + '15',
    borderRadius: 99,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.brand + '40',
    marginTop: 4,
  },
  liveText: {
    fontSize: FONT.sizes.xs,
    fontWeight: FONT.weights.bold,
    color: COLORS.brand,
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['3xl'],
  },
});

import React, { useCallback, useRef, useState } from 'react';
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
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const handleSpotPress = useCallback((spot: Spot) => {
    setSelectedSpot(spot);
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ),
    []
  );

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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%', '85%']}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: COLORS.bgCard }}
        handleIndicatorStyle={{ backgroundColor: COLORS.textMuted }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {selectedSpot && (
            <View>
              <Text style={styles.sheetTitle}>{selectedSpot.name}</Text>
              <Text style={styles.sheetText}>
                {selectedSpot.neighborhood} · {selectedSpot.city}
              </Text>
              {/* Premium placeholders para interface futura */}
              <View style={styles.sheetDivider} />
              <Text style={styles.sheetSectionTitle}>Sobre o Pico</Text>
              <Text style={styles.sheetDescription}>
                Este pico foi descoberto pela comunidade e tem recebido atualizações constantes. Ideal para mandar manobras técnicas de borda.
              </Text>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
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
  bottomSheetContent: {
    flex: 1,
    padding: SPACING.xl,
  },
  sheetTitle: {
    fontSize: FONT.sizes['2xl'],
    fontWeight: FONT.weights.black,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  sheetText: {
    fontSize: FONT.sizes.md,
    color: COLORS.textMuted,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  sheetSectionTitle: {
    fontSize: FONT.sizes.lg,
    fontWeight: FONT.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  sheetDescription: {
    fontSize: FONT.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});

import React, { memo, useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { MapPin, Camera, TrendingUp } from 'lucide-react-native';
import { Spot } from '../data/spots';
import { COLORS, DIFFICULTY_CONFIG, TYPE_CONFIG, FONT, SPACING, RADIUS } from '../theme';

// ─── Constants ────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - SPACING.lg * 2;
const IMAGE_HEIGHT = 200;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface DifficultyBadgeProps {
  difficulty: Spot['difficulty'];
}

const DifficultyBadge = memo(({ difficulty }: DifficultyBadgeProps) => {
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <View style={[styles.badge, { backgroundColor: config.color + '22', borderColor: config.color + '55' }]}>
      <Text style={[styles.badgeText, { color: config.color }]}>
        {config.emoji}  {config.label.toUpperCase()}
      </Text>
    </View>
  );
});

interface TypeBadgeProps {
  type: Spot['type'];
}

const TypeBadge = memo(({ type }: TypeBadgeProps) => {
  const config = TYPE_CONFIG[type];
  return (
    <View style={[styles.badge, { backgroundColor: config.color + '22', borderColor: config.color + '55' }]}>
      <Text style={[styles.badgeText, { color: config.color }]}>
        {config.emoji}  {config.label.toUpperCase()}
      </Text>
    </View>
  );
});

interface StatPillProps {
  icon: React.ReactNode;
  value: string | number;
}

const StatPill = memo(({ icon, value }: StatPillProps) => (
  <View style={styles.statPill}>
    {icon}
    <Text style={styles.statText}>{value}</Text>
  </View>
));

// ─── SpotCard ─────────────────────────────────────────────────────────────────

interface SpotCardProps {
  spot: Spot;
  onPress?: (spot: Spot) => void;
}

export const SpotCard = memo(({ spot, onPress }: SpotCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    if (!isLoaded) {
      opacity.value = withRepeat(
        withSequence(withTiming(0.8, { duration: 800 }), withTiming(0.4, { duration: 800 })),
        -1,
        true
      );
    }
  }, [isLoaded]);

  const skeletonStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const formatCount = (n: number): string =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(spot);
  }, [onPress, spot]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.9}
      accessibilityLabel={`Spot: ${spot.name}, ${DIFFICULTY_CONFIG[spot.difficulty].label}`}
      accessibilityRole="button"
    >
      {/* ── Cover Image ── */}
      <View style={styles.imageContainer}>
        {!isLoaded && <Animated.View style={[styles.skeleton, skeletonStyle]} />}
        <ExpoImage
          source={{ uri: spot.imageUri }}
          style={styles.image}
          contentFit="cover"
          transition={400}
          cachePolicy="memory-disk"
          onLoad={() => setIsLoaded(true)}
        />
        {/* Gradient overlay for text legibility */}
        <View style={styles.imageOverlay} />

        {/* Badges — top right */}
        <View style={styles.badgeContainer}>
          <TypeBadge type={spot.type} />
          <DifficultyBadge difficulty={spot.difficulty} />
        </View>
      </View>

      {/* ── Card Body ── */}
      <View style={styles.body}>
        {/* Name + Location */}
        <Text style={styles.spotName} numberOfLines={1}>{spot.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={12} color={COLORS.textMuted} strokeWidth={2} />
          <Text style={styles.locationText} numberOfLines={1}>
            {spot.neighborhood} · {spot.city}
          </Text>
        </View>

        {/* Feature tags */}
        <View style={styles.featureRow}>
          {spot.features.map((f) => (
            <View key={f} style={styles.featureTag}>
              <Text style={styles.featureTagText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatPill
            icon={<TrendingUp size={12} color={COLORS.brand} strokeWidth={2.5} />}
            value={`${formatCount(spot.dropIns)} drop-ins`}
          />
          <StatPill
            icon={<Camera size={12} color={COLORS.textSecondary} strokeWidth={2} />}
            value={`${formatCount(spot.photoCount)} fotos`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // Image
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  badgeContainer: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    gap: SPACING.xs,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: FONT.sizes.xs,
    fontWeight: FONT.weights.bold,
    letterSpacing: 0.5,
  },

  // Body
  body: {
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  spotName: {
    fontSize: FONT.sizes.lg,
    fontWeight: FONT.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  locationText: {
    fontSize: FONT.sizes.sm,
    color: COLORS.textMuted,
    flex: 1,
  },

  // Feature tags
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  featureTag: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  featureTagText: {
    fontSize: FONT.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT.weights.medium,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginTop: SPACING.xs,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statText: {
    fontSize: FONT.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT.weights.medium,
  },
});

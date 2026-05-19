import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { MapPin, Crosshair } from 'lucide-react-native';
import { MOCK_SPOTS, Spot } from '../data/spots';
import { COLORS, DIFFICULTY_CONFIG, FONT, SPACING, RADIUS } from '../theme';

// ─── Initial region: São Paulo city center ────────────────────────────────────

const SP_REGION: Region = {
  latitude: -23.5505,
  longitude: -46.6333,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

// ─── Marker color by difficulty ───────────────────────────────────────────────

function markerColor(difficulty: Spot['difficulty']): string {
  return DIFFICULTY_CONFIG[difficulty].color;
}

// ─── Selected spot info panel ─────────────────────────────────────────────────

interface SpotInfoPanelProps {
  spot: Spot;
  onClose: () => void;
}

const SpotInfoPanel = ({ spot, onClose }: SpotInfoPanelProps) => {
  const config = DIFFICULTY_CONFIG[spot.difficulty];
  return (
    <View style={styles.infoPanel}>
      <View style={styles.infoPanelHandle} />
      <View style={styles.infoPanelContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoPanelName} numberOfLines={1}>{spot.name}</Text>
          <View style={styles.infoPanelRow}>
            <MapPin size={12} color={COLORS.textMuted} />
            <Text style={styles.infoPanelLocation}>{spot.neighborhood} · {spot.city}</Text>
          </View>
        </View>
        <View style={[styles.infoBadge, { backgroundColor: config.color + '22', borderColor: config.color + '55' }]}>
          <Text style={[styles.infoBadgeText, { color: config.color }]}>{config.emoji} {config.label}</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Map Screen ───────────────────────────────────────────────────────────────

export function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const handleMarkerPress = useCallback((spot: Spot) => {
    setSelectedSpot(spot);
    mapRef.current?.animateToRegion(
      {
        latitude: spot.coordinates.latitude,
        longitude: spot.coordinates.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      350,
    );
  }, []);

  const handleRecenter = useCallback(() => {
    mapRef.current?.animateToRegion(SP_REGION, 500);
    setSelectedSpot(null);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa de Picos</Text>
        <Text style={styles.headerSub}>{MOCK_SPOTS.length} picos marcados</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_DEFAULT}
          initialRegion={SP_REGION}
          showsUserLocation={true}
          showsMyLocationButton={false}
          userInterfaceStyle="dark"
          mapType="standard"
        >
          {MOCK_SPOTS.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={spot.coordinates}
              title={spot.name}
              description={`${DIFFICULTY_CONFIG[spot.difficulty].label} · ${spot.neighborhood}`}
              onPress={() => handleMarkerPress(spot)}
              pinColor={markerColor(spot.difficulty)}
            />
          ))}
        </MapView>

        {/* Legend overlay */}
        <View style={styles.legend}>
          {(['beginner', 'intermediate', 'advanced', 'pro'] as Spot['difficulty'][]).map((d) => (
            <View key={d} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: DIFFICULTY_CONFIG[d].color }]} />
              <Text style={styles.legendText}>{DIFFICULTY_CONFIG[d].label}</Text>
            </View>
          ))}
        </View>

        {/* Recenter button */}
        <TouchableOpacity
          style={styles.recenterBtn}
          onPress={handleRecenter}
          accessibilityLabel="Centralizar mapa"
        >
          <Crosshair size={20} color={COLORS.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Selected spot info panel */}
      {selectedSpot && (
        <SpotInfoPanel
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT.sizes['2xl'],
    fontWeight: FONT.weights.black,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: FONT.sizes.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  mapContainer: {
    flex: 1,
    margin: SPACING.lg,
    marginTop: SPACING.sm,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Legend
  legend: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: 'rgba(9,9,11,0.85)',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FONT.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT.weights.medium,
  },

  // Recenter button
  recenterBtn: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.md,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Info panel
  infoPanel: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.lg,
  },
  infoPanelHandle: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  infoPanelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  infoPanelName: {
    fontSize: FONT.sizes.base,
    fontWeight: FONT.weights.bold,
    color: COLORS.textPrimary,
  },
  infoPanelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: 2,
  },
  infoPanelLocation: {
    fontSize: FONT.sizes.xs,
    color: COLORS.textMuted,
  },
  infoBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  infoBadgeText: {
    fontSize: FONT.sizes.xs,
    fontWeight: FONT.weights.bold,
  },
  closeBtn: {
    padding: SPACING.xs,
  },
  closeBtnText: {
    fontSize: FONT.sizes.base,
    color: COLORS.textMuted,
  },
});

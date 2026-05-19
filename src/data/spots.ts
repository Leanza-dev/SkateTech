import { Difficulty, SpotType } from '../theme';

// ─── Spot Data Model ──────────────────────────────────────────────────────────

export interface Spot {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  difficulty: Difficulty;
  type: SpotType;
  /** Cover image URI */
  imageUri: string;
  /** Number of skaters who "dropped in" (checked in) */
  dropIns: number;
  /** Number of community photos uploaded */
  photoCount: number;
  /** Primary obstacle types */
  features: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_SPOTS: Spot[] = [
  // ── Picos de Rua ──────────────────────────────────────────────────────────
  {
    id: 'sp-001',
    name: 'Praça Roosevelt',
    neighborhood: 'Centro',
    city: 'São Paulo, SP',
    difficulty: 'pro',
    type: 'rua',
    // Urban concrete plaza — wide steps, granite ledges, brutalist architecture
    imageUri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    dropIns: 4284,
    photoCount: 1347,
    features: ['Bancos de Concreto', 'Bordas', 'Piso Liso'],
    coordinates: { latitude: -23.5484, longitude: -46.6475 },
  },
  {
    id: 'sp-002',
    name: 'CCBB / Vale do Anhangabaú',
    neighborhood: 'Centro',
    city: 'São Paulo, SP',
    difficulty: 'pro',
    type: 'rua',
    // Brutalist urban staircase & handrail — raw concrete architecture
    imageUri: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    dropIns: 2891,
    photoCount: 812,
    features: ['Corrimão', 'Escada 14 Degraus', 'Gap Gigante'],
    coordinates: { latitude: -23.5453, longitude: -46.6374 },
  },
  {
    id: 'sp-003',
    name: 'Largo da Batata',
    neighborhood: 'Pinheiros',
    city: 'São Paulo, SP',
    difficulty: 'intermediate',
    type: 'rua',
    // Open urban public square — granite pavement, open skies
    imageUri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    dropIns: 1743,
    photoCount: 489,
    features: ['Gap', 'Manual Pad', 'Bordas de Granito'],
    coordinates: { latitude: -23.5647, longitude: -46.6944 },
  },
  {
    id: 'sp-004',
    name: 'Elevado Presidente João Goulart',
    neighborhood: 'Santa Cecília',
    city: 'São Paulo, SP',
    difficulty: 'beginner',
    type: 'rua',
    // Elevated urban highway — long asphalt stretch, city skyline
    imageUri: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    dropIns: 3210,
    photoCount: 567,
    features: ['Long Line', 'Flatground', 'Asfalto Liso'],
    coordinates: { latitude: -23.5415, longitude: -46.6510 },
  },

  // ── Pistas ────────────────────────────────────────────────────────────────
  {
    id: 'sp-005',
    name: 'Vila-Lobos Skatepark',
    neighborhood: 'Alto de Pinheiros',
    city: 'São Paulo, SP',
    difficulty: 'intermediate',
    type: 'pista',
    imageUri: 'https://images.unsplash.com/photo-1574610758776-4b8e0e23b2f4?w=800&q=80',
    dropIns: 5120,
    photoCount: 1678,
    features: ['Bowl', 'Street Plaza', 'Quarter Pipe'],
    coordinates: { latitude: -23.5476, longitude: -46.7214 },
  },
  {
    id: 'sp-006',
    name: 'Parque Zilda Natel (Sumaré)',
    neighborhood: 'Perdizes',
    city: 'São Paulo, SP',
    difficulty: 'advanced',
    type: 'pista',
    imageUri: 'https://images.unsplash.com/photo-1555817128-342abb9e69d4?w=800&q=80',
    dropIns: 2450,
    photoCount: 760,
    features: ['Bowl Fundo', 'Half-pipe', 'Transições Radicais'],
    coordinates: { latitude: -23.5422, longitude: -46.6784 },
  },
  {
    id: 'sp-007',
    name: 'Centro de Esportes Radicais - Tietê',
    neighborhood: 'Bom Retiro',
    city: 'São Paulo, SP',
    difficulty: 'pro',
    type: 'pista',
    imageUri: 'https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=800&q=80',
    dropIns: 1840,
    photoCount: 524,
    features: ['Bowl Olímpico', 'Street Course', 'Banks'],
    coordinates: { latitude: -23.5186, longitude: -46.6450 },
  },
];

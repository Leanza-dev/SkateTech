import { Difficulty } from '../theme';

// ─── Spot Data Model ──────────────────────────────────────────────────────────

export interface Spot {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  difficulty: Difficulty;
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
// Using high-quality Unsplash photos that work as placeholder images

export const MOCK_SPOTS: Spot[] = [
  {
    id: 'sp-001',
    name: 'Vale do Anhangabaú',
    neighborhood: 'Centro',
    city: 'São Paulo, SP',
    difficulty: 'intermediate',
    imageUri: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80',
    dropIns: 1284,
    photoCount: 347,
    features: ['Corrimão', 'Escada', 'Piso Liso'],
    coordinates: { latitude: -23.5453, longitude: -46.6374 },
  },
  {
    id: 'sp-002',
    name: 'Skate Plaza Ibirapuera',
    neighborhood: 'Moema',
    city: 'São Paulo, SP',
    difficulty: 'beginner',
    imageUri: 'https://images.unsplash.com/photo-1601268298774-e6cadb24ae08?w=800&q=80',
    dropIns: 2891,
    photoCount: 512,
    features: ['Manual Pad', 'Ledge', 'Bank'],
    coordinates: { latitude: -23.5874, longitude: -46.6576 },
  },
  {
    id: 'sp-003',
    name: 'Largo da Batata',
    neighborhood: 'Pinheiros',
    city: 'São Paulo, SP',
    difficulty: 'advanced',
    imageUri: 'https://images.unsplash.com/photo-1532117182044-031e7cd916ee?w=800&q=80',
    dropIns: 743,
    photoCount: 189,
    features: ['Gap', 'Drop', 'Rail'],
    coordinates: { latitude: -23.5647, longitude: -46.6944 },
  },
  {
    id: 'sp-004',
    name: 'MASP Steps',
    neighborhood: 'Bela Vista',
    city: 'São Paulo, SP',
    difficulty: 'pro',
    imageUri: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    dropIns: 421,
    photoCount: 934,
    features: ['Escada Gigante', 'Corrimão Duplo', 'Piso de Pedra'],
    coordinates: { latitude: -23.5614, longitude: -46.6560 },
  },
  {
    id: 'sp-005',
    name: 'Praça Olímpica Vila Madalena',
    neighborhood: 'Vila Madalena',
    city: 'São Paulo, SP',
    difficulty: 'beginner',
    imageUri: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&q=80',
    dropIns: 3120,
    photoCount: 678,
    features: ['Bowl', 'Half-pipe', 'Quarter'],
    coordinates: { latitude: -23.5533, longitude: -46.6927 },
  },
  {
    id: 'sp-006',
    name: 'Minhocão (Elevado)',
    neighborhood: 'Santa Cecília',
    city: 'São Paulo, SP',
    difficulty: 'intermediate',
    imageUri: 'https://images.unsplash.com/photo-1581093196277-9f608bb3b511?w=800&q=80',
    dropIns: 988,
    photoCount: 256,
    features: ['Long Line', 'Freestyle', 'Flat Ground'],
    coordinates: { latitude: -23.5415, longitude: -46.6510 },
  },
];

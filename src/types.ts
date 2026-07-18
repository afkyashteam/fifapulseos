/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  email: string;
  role: 'FAN' | 'ORGANIZER' | 'VOLUNTEER' | 'OPS ADMIN';
  name: string;
  sector: string;
  avatarUrl: string;
}

export interface Incident {
  id: string;
  time: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
  type: string;
}

export interface AiInsight {
  id: string;
  risk: 'High Risk' | 'Medium Risk' | 'Optimization';
  confidence: number;
  title: string;
  description: string;
  recommendedAction: string;
}

export const IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwBAXB5SwZ4pLCWgRp9e_QDbVoNG4ZWf4ouNTcyjqu0KsyNyjvasL4A5WOdS9QtVAmQipBeqO8FjQvNGgTVgsnY2zaiKi2-NAaK7qFq7lzsio9rA9Nj9so26teQnEh0I1DdjZrOQQknT-xRA3zO9GStcZZVmr5kEVhcwwESm_uhK-7CnTzuODp-nQ41XvY7xrQJQtxCvBH-05n0y3aKwO3k8Pl7l5vh5L6pU_tjbot2kg1zBGs398RwfGHJu11IhHYqHF1dy7HNK38',
  cooProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVc8Sh6MIrpufbqD8aoEfY_XzI6kMPWf4pZ1xeOhPK1_w0REQIjGdacuYmkk-R6M0wRHkSUI-VeUa5_fm0Vmyvicbyb-Way8G6s0Lq9TIqVrQTDALHxG-cVxBLg_Ng9Q_tqURqPevAasrvIHwdOp_0R5BqHrcRaschTGMEApiwxiMhexwERakxBu2mIZx3iWM75LxMxlfaWZy7F8g5T5cdYxhFZG-Ok-p9nv3XWJUtCHBCY7FmTbfXDEXUcV__Eb7nUSnLr4ZQHG8',
  tacticalCoo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ILVZLfHJJWjhPOQT9oPiD_P4nuUL34QhVgLVe89-X0xnBmRiGGMTmX_5IYUB5evlHvDI-EjGeSrK0qc1aC2m9oQW0iR7j7TC7HnRyukygpLULVbc9D8doJX-UKFNrR6YHZWd6AO1NnkBOyeRfqRebq7E5SzXTWGcxbl6ahYCPV6yHrmgUdSDnPbUi2VBq9mFa_QbtD2C4TBNZT6h-9eFPBpOfwweXX6VGUaI4rJjTpJuQmtbo4ZXqfQFcvO1ftWRxfUYXIJ82G7X',
  heroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5KKTHOg9wpMme2Cmppox5xQoygegjdwtHtc6faZBkot0lEftUlAnqWw_AlcVLIPIV6R45kxBoEye1gbdfRilPkhJ0AKlxm148b3UGd6pSQxY1i-9_E_hyPNsaXi-eFbz9uxV1UOceaGMnimHOjq9lZRyBLZ1Sog90qbVMXIQBXQDzdV9uzLsLXcfhmOoykLaptTUuG8FS0vnrzGRSBBbSj7GsqXQXrioiyRWLt8wOjR1Cq9fDgLsKfl3yiByhZxmZLgc8gqPj96_z',
  authBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXHD-4FY5LLThmf-erKP1U3sb85un8jXl7mPmEzmrf-zM_PMA2HBxGckumttQaP-SOEySf1XawuMEBiXcYRpy6n8KQjS_dxYq4DnfgwMI3SWCCUiegbp896HDzgRW79cXI0l_x0NK4qPkJP9oAxdl5ipzWkQ_3HUC6bcSa73mYU7nG797RX1AFiiBtHPZJa-4BIrA-xmG99HlPjZyl3Q_8FkB7-u7JPwnfWoKtNVIIzkopdtc0-SiOzHBsEoCpVfhLNDIEhLG8-gmF',
  commandMapBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNGOyd6u7AfJmg-EjkiOM4CtZCh2fDQ7kZt0vzBUxOMAFP9lYCRiN-DPXm_YYD0HqImToLCc_1R1J_lOznPf-t0H2BamAKX7_2COGyriJGWMgYOVC5RwiaNBJcM5pJq4KE6RtjIIM8XIN2VAXpuRrQ5az_v5kd3QbEel7m6Uf41n8t_be34COEJ0TDqgf-cd9TEOgnGt8E3VanV47qsuJtAY5US4lSglIp3D1IJBTfG4CI9_uQzwhai6AAZVhtX6_Sa1-cBGGknjjv',
  analyticsMapBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc8B90gAGB5AO7HuIo4zAQw2jCLk4kl5JNfOcwfoTNFSKKLW1EjwJEL9CWp7xxKOazLrlZxcDChTonhYGE4ZCBHqkttMDYZkJq1gbWmXHLiUBZOEn74CZ551jGOkm4EeYsFdcYgzPgP45O-AyplKS-szBC9LHdaxC7hMg8dzmugIqgc_Kw3vJMlNMkAz4AyfkNr1MRQlKJbVz2mvWHF9Q_6ca4IyguCtARGaJ7-_0VVJjjYhJ6QQeVd76e18MtbLlc8WlgqL7rafk0',
  digitalTwinBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdgzcT0oxLuITiPEpsae0yaMbIGyUXU0F7axNm77M8I7GDNt7QEx6ONY-VJ4i0gg_hDEOY9UPW3LjAIg6llE8TMmA_WNM9moP51o9mXcVVZT0SDms96WRe36RrS8BrjfjvF8dLzcOy6jrTgiQ_fA7-Zh9ix5HzyPIgoiafuh2GF2F5I1hI76SVCgebdZCElBuX64jbAMWVZosN5f04q3GxKr24ghI98DxTaxJ33olGWKcswpsZtoUKVwfUkHzMOj2UsDO3_55c3Ywe',
  michaelVance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjp0FYVYIeoOj6EQCX3dFZ-c5Mt8KOilCFp_EUzwifczqP2drIJ_K80hxidwQWLa5noCmGmGceKaNDJVko9lyL7EmzG8LaZIkYnlLJ_dmLGTJfLmHcj4T45gpOPIDarsrsm53ZLObasda784kOuysHvHmclSUSu9bv-qjC2Q1bpG7QxsUUH1KgYrvlr-p9HXYAZnlajfQvLjXemD4Wk6Hpi6qZL1g4p1SuJSsPMZW8HWQDE3rx01xOne4eA2iu3UsVAHgNWAxIQzxB'
};

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: '1',
    time: '14:24:02',
    message: 'Crowd pressure spike detected at Gate G-14. Immediate intervention required.',
    severity: 'high',
    location: 'Gate G-14',
    type: 'Crowd Control'
  },
  {
    id: '2',
    time: '14:22:15',
    message: 'Medical Team Alpha dispatched to Sector 4 (Heat exhaustion report).',
    severity: 'medium',
    location: 'Sector 4',
    type: 'Medical'
  },
  {
    id: '3',
    time: '14:18:50',
    message: 'System check complete. All surveillance drones active in Perimeter B.',
    severity: 'low',
    location: 'Perimeter B',
    type: 'Security'
  },
  {
    id: '4',
    time: '14:10:00',
    message: 'Shift change: Commander Zhang assumes control of Central Hub.',
    severity: 'low',
    location: 'Central Hub',
    type: 'Staff'
  }
];

export const INITIAL_INSIGHTS: AiInsight[] = [
  {
    id: '1',
    risk: 'High Risk',
    confidence: 98,
    title: 'Gate A congestion predicted',
    description: 'Arrival surge detected from North Transit Hub. Bottleneck expected in 12 mins.',
    recommendedAction: 'Open Emergency Gates 14-18 and redirect Metro Bus Line 5.'
  },
  {
    id: '2',
    risk: 'Medium Risk',
    confidence: 82,
    title: 'Metro Line 2 delayed',
    description: 'Mechanical failure at Plaza Station. Affecting 4,200 fans en route.',
    recommendedAction: 'Dispatch 8 backup shuttles to Plaza Station immediately.'
  },
  {
    id: '3',
    risk: 'Optimization',
    confidence: 74,
    title: 'Food Court 5 overloaded',
    description: 'Wait times exceeding 15 minutes. Zone 4 amenities under-utilized.',
    recommendedAction: 'Broadcast digital vouchers for Zone 4 stalls to nearby devices.'
  }
];

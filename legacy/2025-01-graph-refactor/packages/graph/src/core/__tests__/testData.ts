// packages/graph/src/core/__tests__/testData.ts
export const testConcepts = [
  {
    id: 'funksjoner',
    title: 'Funksjoner',
    tags: ['grunnleggende', 'funksjoner'],
    difficulty: 1
  },
  {
    id: 'derivasjon',
    title: 'Derivasjon',
    tags: ['analyse', 'derivasjon'],
    difficulty: 3,
    prerequisites: [
      { id: 'funksjoner', type: 'must-understand' },
      { id: 'grenser', type: 'must-understand' }
    ]
  },
  {
    id: 'grenser',
    title: 'Grenser',
    tags: ['analyse', 'grenser'],
    difficulty: 2,
    prerequisites: [
      { id: 'funksjoner', type: 'helpful' }
    ]
  },
  {
    id: 'integrasjon',
    title: 'Integrasjon',
    tags: ['analyse', 'integrasjon'],
    difficulty: 3,
    prerequisites: [
      { id: 'derivasjon', type: 'must-understand' }
    ]
  }
];
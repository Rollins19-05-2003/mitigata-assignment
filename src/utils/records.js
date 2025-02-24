export const records = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    about: {
      name: `Demo_${index + 1}`,
      status: ['ACTIVE', 'INACTIVE', 'BLOCKED'][index % 3],
      email: `demo.d${index + 1}@demo.com`,
    },
    details: {
      date: new Date(2024, 11, 10 + (index % 10)).toLocaleDateString('en-GB'),
      invitedBy: `Dem ${index + 1}`,
    },
  }));

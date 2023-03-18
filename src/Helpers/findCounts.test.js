import findCounts from './findCounts';

describe('findCounts', () => {
  const input = [
    {
      userID: '2abece6f-effe-47b3-9bf6-9e310ca612f2',
      userName: 'Rodolpho Vendramini',
      value: 7,
    },
    {
      userID: 'ebda0a01-2bc4-4bcd-868b-c17f5e5f0990',
      userName: 'Luciana Ys',
      value: 6,
    },
    {
      userID: '5ff35d90-35dc-4d75-8eb3-89d28f57891b',
      userName: 'Luciana ALOP',
      value: 3,
    },
    {
      userID: '5ff35d90-35dc-4d75-8eb3-89d28f57891b',
      userName: 'Luciana ALOP',
      value: 2,
    },
    {
      userID: '708be646-3cd4-459f-8e94-3d47b37ea743',
      userName: 'Aninha',
      value: 1,
    },
  ];

  it('counts the number of occurrences of repeated names', () => {
    const expectedOutput = [
      {
        userID: '2abece6f-effe-47b3-9bf6-9e310ca612f2',
        userName: 'Rodolpho Vendramini',
        value: 7,
      },
      {
        userID: 'ebda0a01-2bc4-4bcd-868b-c17f5e5f0990',
        userName: 'Luciana Ys',
        value: 6,
      },
      {
        userID: '5ff35d90-35dc-4d75-8eb3-89d28f57891b',
        userName: 'Luciana ALOP',
        value: 5,
      },
      {
        userID: '708be646-3cd4-459f-8e94-3d47b37ea743',
        userName: 'Aninha',
        value: 1,
      },
    ];

    expect(findCounts(input, 'userName', 'userID')).toEqual(expectedOutput);
  });
});

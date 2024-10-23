describe('Crime Reports Routes', () => {
  it('should submit a new crime report', async () => {
    const res = await request(app).post('/api/crimeReports/submit').send({
      crimeType: 'theft',
      description: 'A wallet was stolen',
      location: 'Main Street',
      dateTime: '2024-09-09T12:00:00Z',
    });
    expect(res.statusCode).toEqual(200);
  });
});

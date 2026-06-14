import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/municipality/:municipalityNumber/comments', () => {
    return HttpResponse.json({
      text: "Data has been posted!"
    });
  }),
];
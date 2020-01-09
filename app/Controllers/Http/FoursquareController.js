
const api = make('App/Services/ApiService')
const Env = use('Env')
const foursquare = require('node-foursquare')({
  secrets: {
    clientId: Env.get('FOURSQUARE_ID'),
    clientSecret: Env.get('FOURSQUARE_SECRET'),
    redirectUrl: `${Env.get('APP_URL')}/auth/foursquare/callback`
  }
})

class FoursquareController {
  async index ({
    request, response, auth, view
  }) {
    try {
      const user = await auth.getUser()
      const token = await api.getToken('foursquare', user.id)
      if (token === null) {
        response.redirect(`/auth/foursquare?redirect=${request.originalUrl()}`)
      }

      try {
        const foursquareResponse = await this.getData(token, 'Lagos, Nigeria')
        return view.render('api.foursquare', { locations: foursquareResponse.results.venues })
      } catch (e) {
        console.log('error', e.message)
        return view.render('api.foursquare', { locations: [] })
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  getData (token, query) {
    return new Promise((resolve, reject) => {
      foursquare.Venues.searchLocation({ lat: '6.453396605899419', long: '3.395676612854003' },
        { radius: 50000, query },
        token.accessToken,
        (err, results) => {
          if (err) { return reject(err) }
          return resolve({ results })
        })
    })
  }
}

module.exports = FoursquareController

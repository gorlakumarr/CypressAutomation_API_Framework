/// <reference types="Cypress" />

const dataJson = require('../../fixtures/createUser.json')

describe('Check weather information for cities', function () {

    let baseUrl = 'https://www.metaweather.com/api/location/search/?query='
    const keyword = 'san'
    it('get wether information for cities', function () {
        cy.log('get wether information for cities')
        cy.request({
            method: 'GET',
            url: baseUrl + 'san'
        }).then((getRes) => {
            const city = getRes.body[0].title
            return city
        })
            .then((city) => {
                cy.request({
                    method: 'GET',
                    url: baseUrl + city
                }).then((getResForCity) => {
                    expect(getResForCity.body[0]).have.property('title', city)
                })
            })
    })

    it('Check the cities for the Get API', function () {
        cy.log('get wether information for cities')
        cy.request({
            method: 'GET',
            url: baseUrl + keyword
        }).then((getRes) => {
            const cityName = getRes.body
            return cityName
        })
            .then((cityName) => {

                for (let i = 0; i < cityName.length; i++) {
                    const element = cityName[i].title;
                    cy.log('CityName', element)
                    expect(element.toUpperCase()).contain(keyword.toUpperCase())
                    // cy.request({
                    //     method: 'GET',
                    //     url: baseUrl + element
                    // }).then((getResForCityName) => {
                    //     expect(getResForCityName.body[i]).have.property('title', element)
                    // })
                }
            })
    })
})
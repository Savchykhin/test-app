/// <reference types="cypress" />

describe('Filters', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    const filterByBedroom = roomNum => {
        cy.intercept(`/default/qatests?beds=${roomNum}&*`).as('filteredResults')
        cy.get('button').contains('Set Filters').click()
        cy.get('button').contains(`${roomNum}+`).click()
        cy.get('button').contains('filter').click()
        cy.wait(['@filteredResults', '@filteredResults'])
        cy.get('.jss6 > :nth-child(3)')
            .each($el => {
                expect($el).to.contain('Bedrooms')
                const roomNumber = parseInt($el.text().replace('Bedrooms: ', ''))
                expect(roomNumber).to.be.greaterThan(roomNum - 1)
            })
    }

    it('should filter by bedrooms', () => {
        filterByBedroom('1')
        filterByBedroom('5')
        filterByBedroom('6')
    })


})

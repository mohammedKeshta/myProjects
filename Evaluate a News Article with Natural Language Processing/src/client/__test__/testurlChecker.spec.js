import { checkForURL } from '../js/urlChecker'

describe("Check for valid URL ", () => {

    test('URL defined', () => {
        expect(checkForURL).toBeDefined()
    })
    test('Invalid URL', () => {
        expect(checkForURL("KO")).toBeFalsy()
    })
    test('valid URL', () => {
        expect(checkForURL("www.google.com")).toBeTruthy()
    })
})
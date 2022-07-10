import {parseSearchInfo} from "./utils";

///////////////////
// RegEx testing //
///////////////////
// This test will pass if the parseSearchInfo function works correctly and returns the correct object
describe('Test expression on the RegEx from utils', () => {
    describe("Phone tests", () => {
        test("Testing for full number", () => {
            let searchInput = "(053) 858-9246"
            let searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0538589246")
            expect(searchResult.age).toBe("")

            searchInput = "(053) 858-9246"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0538589246")
            expect(searchResult.age).toBe("")
        
            searchInput = "053858-9246"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0538589246")
            expect(searchResult.age).toBe("")

            searchInput = "0538589246"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0538589246")
            expect(searchResult.age).toBe("")
        })
        

        test("Testing for half number", () => {
            let searchInput = "(053) 858"
            let searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("053858")
            expect(searchResult.age).toBe("")

            searchInput = "053 858"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("053858")
            expect(searchResult.age).toBe("")
        
            searchInput = "053858"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("053858")
            expect(searchResult.age).toBe("")

            searchInput = "053858"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("053858")
            expect(searchResult.age).toBe("")
        })

        test("Possible user phone entries", () => {
            let searchInput = "077"
            let searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("077")
            expect(searchResult.age).toBe("")

            searchInput = "077)"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("077")
            expect(searchResult.age).toBe("")

            searchInput = "(077) 6-555"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0776")
            expect(searchResult.age).toBe("")

            searchInput = "077 66-5-5"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("07766")
            expect(searchResult.age).toBe("")

            searchInput = "077 666-55"
            searchResult = parseSearchInfo(searchInput)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("07766655")
            expect(searchResult.age).toBe("")
        })
    })

    describe("Entries with special char", () => {
        test("Name * Phone", () => {
            let searchInput = "Carlos * 055 7777777"
            // The search of this test WILL give an error of SPECIAL_CHAR
            expect(() => {parseSearchInfo(searchInput)}).toThrowError("SPECIAL_CHAR")
        })
    })
});

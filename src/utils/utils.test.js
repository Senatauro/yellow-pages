import {parseSearchInfo} from "./utils";

///////////////////
// RegEx testing //
///////////////////
// This test will pass if the parseSearchInfo function works correctly and returns the correct object
describe('Test true expression on the RegEx from utils', () => {
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
            console.log(searchResult)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0538589246")
            expect(searchResult.age).toBe("")

            searchInput = "0538589246"
            searchResult = parseSearchInfo(searchInput)
            console.log(searchResult)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("0538589246")
            expect(searchResult.age).toBe("")
        })
        

        test("Testing for half number", () => {
            let searchInput = "(053) 858"
            let searchResult = parseSearchInfo(searchInput)
            console.log(searchResult)
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
            console.log(searchResult)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("053858")
            expect(searchResult.age).toBe("")

            searchInput = "053858"
            searchResult = parseSearchInfo(searchInput)
            console.log(searchResult)
            expect(searchResult.name).toBe("")
            expect(searchResult.phone).toBe("053858")
            expect(searchResult.age).toBe("")
        })
    })    
});

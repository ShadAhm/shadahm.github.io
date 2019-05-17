So there's this guy who works in the same company as mine, he works in the Australian office, in Melbourne while I am in the Kuala Lumpur office. This means we have never met, I do not know what he looks like. But we exchange e-mails at least weekly, sometimes I take a while to complete his requests, sometimes he gets annoyed, but during holidays we are on eachothers wish-well lists. Let's call him Hendri. 

Hendri works in the assets-management department, he has to key in data for thousands of assets monthly. This involves clicking on a page that, takes a bit long to load. Then searching for a particular fridge, or ceiling fans or whatever that he'd like to edit, and then change the field values and click save. Pretty easy. Except he has to do it so many times over, it'll make any healthy person sick very quickly. 

Unfortunately for me and the rest of the dev team, at some point Hendri realizes there's a quicker way of doing this. Thus born a dreadful thing that we internally call “Hendri Tickets". These tickets always look somewhat the same, but are slightly different each time. It always comes with an Excel file containing a few thousand rows, on the A column would be the asset he would like to modify, and the other columns the modifications to make. Something like this:

| AssetId | Attribute name | Old value | Change to |
| --- | --- | --- | --- |
| 100 | warranty-date | 2019-01-02 | 2019-01-03
| 100 | manufacturer | Senheng | Senheng (2) |
| 103 | manufacturer | null | Sony |
| 104 | refrigerant-type | R403a | R404A |

For the first few Hendri Tickets I would have created the SQL myself, via string concatenation on a column, or one of those ways. But as the tickets keeps coming, and other people are starting to send Hendri Tickets of their own, we needed to be more automated. 

## Turning this into a project

When turning a problem into a software solution, look at four things:

1. How much time do we spend on the current process? (a)
2. How often do we repeat this process? (b)
2. How much time will be spent on the process involving after the software? (c)
3. How much time and/or resources will be spent creating the software? (d)

If the difference of `c` from `a` (the efficiency-gained) is far greater than `d`, then it is likely worth developing the software. 

### Goals

The goals of an automation software should always be to the tune of efficiency-gained. If it's just as tedious to use the software as it is to do it manually, then it's a failed solution. 


# blog imcomplete youre not supposed to see this yet
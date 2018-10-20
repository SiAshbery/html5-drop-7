# HTML5 Drop 7

A Drop 7 clone made for the web using Phaser JS .

## Getting Started

```
clone this repo
```

## Notes

This project is a work in progress.

### Next steps:

-

## The Brief

The task is to implement the core gameplay mechanic from the game Drop 7 in HTML5. Drop7 is a mobile puzzle game, available on Android and iOS, with a mechanic originally from the game Chain Factor.

The game is played on a 7x7 square grid. In each round, the player places a disc that falls from the top of the grid. Each disc has a number 1-7, or a blank. Whenever the number of any disc matches the number of contiguous discs in a row or column, that disc disappears and also hits any blank discs it touches. When a blank is hit twice, it turns into a numbered disc. After a number of turns, the round ends and a full row of blank discs emerges from the bottom of the grid. There is no time limit, and discs may be dropped at the player's leisure. The objective is to eliminate discs and score combos for as long as possible until either the grid overflows or the grid is full and it is impossible to place another disc. If the player clears the screen of all discs, then the player is given a 70,000 point bonus.

## Approach

My first task is to go over the brief and extract any keywords that seem pertinent to the task at hand.

The reasons for this is two fold:

- First, by simplifying the brief down to it's most basic units of knowledge and their interactions, it allows me to form a clear idea of what I'm actually building, hopefully helping me to avoid feature creep and a bloated piece of software.
- Second, once I have identified these basic units, I can scope a series of deliverables that progressively add more complicated mechanics.

**Note** These keywords are not etched in stone nor exhaustive and can (should) be altered, pruned and added to as my knowledge of the system improves.

Identified Keywords:

```
grid
numbered disc
number
blank disc
row column
round
place
contiguous discs
top
bottom
player
score
combo
disappear
overflow
point
bonus
clear
turn
```

With the keywords extracted the next step is to roughly categorize them, splitting the keywords into nouns, verbs and adjectives seems a good way to loosely identify keywords that may be objects, methods and properties respectively.

**Note** Some nouns seem to implicitly suggest an action so some liberties are taken in their interpretation.

| Nouns  |      Verbs       | Adjectives |
| ------ | :--------------: | ---------: |
| Grid   |      Place       |   Numbered |
| Disc   | Instruct/Command |      Blank |
| Row    |       Turn       | Contiguous |
| Column |      Score       |            |
| Round  |     Overflow     |            |
| Player |    Disappear     |            |
| Score  |      Clear       |            |
| Combo  |                  |            |
| Point  |                  |            |
| Bonus  |                  |            |
| Top    |                  |            |
| Bottom |                  |            |
| Turn   |                  |            |

The process of plotting how the objects might interact without each other highlights a number of considerations:

- Whilst not explicitly stated, it is implicit that the grid is made of squares. Specifically a 7x7 grid has 49 squares.

  - The player can place a disc in a square so this suggests that a square can either be occupied or blank.
  - A Grid has many rows and columns made up of individual squares, it would make more sense to derive these structures from the grid rather than storing them as individual entities.

- A disc represents the objective of the game.

  - A disc can either be numbered or blank, best represented by a boolean.
  - Blank discs become numbered when they are hit twice.
    - Discs must be able to become numbered after enough hits (breaking)
    - A blank disc must know how many times it has been hit.
      - A grid knows where discs are in relation to other discs and so should inform blank discs when they are hit.
  - Discs disappear when they are scored.
    - A grid knows which discs are scorable and so should tell a disc when to disappear.

- A round is a discreet period of play defined by a number of turns.

  - It makes sense that a round should have turns. Specifically:
    - Turns taken
    - Max turns
    - Remaining turns (can be derived from the difference between turns taken and max turns)
  - When a round is over, the grid should reconfigure itself with a row of blank discs at the bottom of the screen.

- A player object is the representation of the physical player in the game.

  - A player seeks to increase their score by taking a turn to place a disc.
    - This suggests a player can take turns, and has a score.

- Somethings must handle the process of scoring.

  - Because scoring considers an indivudal disc and its position relative to other discs on the grid, whatever object has responsibility for tracking when a scoring configuration is present must have knowledge of both.
    - The grid has responsibility for objects placed within it and their position so, to begin with at least, it seems that the grid might be a good class to track when a configuration should score.
      - This feels like it may contravene single responsiblity principle but rather than invent a new class that can peer into the grid and multiple discs and decided a score, this solution provides a simpler jumping off point which I can refactor if needed.
      - Combos are decided if a scoring configuration is created multiple times during a turn.
        - A grid just has to know when a scoring configuration is present and so how many times this happens is irrelevant to it.
          - _This suggests a turn might be its own class that knowns how many times a scoring configuration was present on the grid during its life-time._
            - Upon reflection it seems a turn would simply be an interface between player and grid that does nothing more than count, so the turn class was removed.
          - Since a player takes turns and has a score it seems reasonable to place the responsibility for scoring a turn in the player class.

- Now that we know a grid is responsible for understanding its current configuration it can see when the grid has been cleared.

  - The player knows how to score based on the grid's reported status during a turn, so it seems reasonable to score bonuses when the grid reports itself as clear.

- As with the above, a grid knows when it is full and thus the game ends.
  - The player knows how to take turns and so can track if it is unable to do so and thus if the game is over.
    - This feels as though the player may be gaining too much responsbility at the moment but I am not yet convinced of the need to invent a game manager class to take on these responsibilities. However this may become a requirement later.

Going through this process helps me move the nouns, verbs and adjectives into potential Objects, Methods and Attributes:

| Objects |                                         Methods                                         |             Attributes |
| ------- | :-------------------------------------------------------------------------------------: | ---------------------: |
| Grid    |    is scorable? (disc's disappear, ajacent blank discs are hit), is clear?, is full?    |                squares |
| Disc    |                                    break, disappear                                     |   hits, blank?, number |
| Round   |                                   get remaining turns                                   | turns taken, max turns |
| Player  | take turn (place disc), score turn(score combo, score bonus), can take turn?(game over) |                  score |

# Milestones

As mentioned I think it would be best to approach this project progressively. Outlining a a series of deliverable milestones which each builds complexity upon the previous on.

The purepose for this is twofold:

- Avoid confusion by keeping the steps as simple as possible.
- Avoid feature creep by ensuring my efforts has a definite end point at any stage.

The milestones are defined as follows:

1. Render a grid on which a disc can be placed.
2. Place multiple numbered discs that stack up on top of each other.
3. Score when discs in column meet the condition (number on disc == number of discs in column)
4. Score when discs in row meet the condition (number on disc == number of consecutive discs in row)
5. Score a combo
6. Can place blank discs that 'break' when hit twice
7. Can fill the grid (and lose)
8. Can finish a round (add row of blank discs at bottom)
9. Can clear the grid (bonus score)

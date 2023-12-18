<!DOCTYPE html>
<html>
    <head>
        <title>Board Page</title>
        <link  rel="stylesheet" href="{{ asset('./css/boardPage.css') }}">
    </head>

    <body>
        <main>
        <div class="flex-containerMain">
                    <div class="menu">

                        <div id="titleDiv">
                            <h2>Title:</h2>
                            <div>
                                <textarea id="titleArea" class="title"></textarea>
                            </div>
                        </div>

                        <label class="labelMenu">Menu</label>
                        <div class="flex-containerBoard">
                            <label class="options">Board Options:</label>
                            <button id="createButton" class="buttonMenu" onclick="CreateBoardInPage()">Create Board</button>

                            <button id="finalDeleteBoard" class="buttonMenu" onclick="deleteSelectedBoard()"> Delete Selected Board</button>

                            <button id="buttonEdit" class="buttonMenu" onclick="editBoard()">Edit Board</button>
                            <button id="buttonDelete" class="buttonMenu" onclick="viewBoards()" >View Boards</button>
                            <button id="buttonSave"class="buttonMenu" onclick="saveBoardInformation()">Save Boards</button>
                         </div>
                        <div id="menuTasks" class="flex-containerTask"> 
                            <label class="options">Task Options:</label>
                            <button class="buttonMenu" onclick="craeteTask()">Create Task</button>
                            <button class="buttonMenu" onclick="editSticky()">Edit Task</button>
                            <button class="buttonMenu" onclick="deleteElementOnBoard()">Delete Task</button>
                            <button class="buttonMenu" onclick="importWindow()">Import Task</button>
                            <button class="buttonMenu" onclick="exportAction()">Export Task</button>
                            <button class="buttonMenu" onclick="selectTask()">Select Tasks</button>
                            <button class="buttonMenu" onclick="sortTask()">Group Task by color</button>
                        </div> 
                    </div>
            
           
            <div class="mainScreen">
                <div id="descriptDiv">
                    <p id="paragraph"></p>
                    <h2>Description of board:</h2>
                    <div>
                        <textarea id="descriptionArea" class="description"></textarea>
                    </div>
                </div>


            <div id='screen'>
                <div id="edit" class="editMenu ">
                    <p class="editTransformation">Edit title:</p>
                    <div>
                        <textarea id="myTitleArea" class="editTitle"></textarea>
                    </div>
                    <p class="editTransformation">Edit description:</p>
                    <div>
                        <textarea id="myDescriptionArea" class="editDescription"></textarea>
                    </div>
                     
                    <div class="flex-container3">
                        <button onclick="saveNewDataBoard()">OK</button>
                        <button onclick="backFunction()">BACK</button>
                   </div>

                </div>

                <div id="add" >
                    <textarea id="taskAdd" class="textareaAdd  gray"></textarea>
                    <div class="flex-container4">
                        <button class="gray" onclick="setGrayColor()"></button>
                        <button class="yellow" onclick="setYellowColor()"></button>
                        <button class="green" onclick="setGreenColor()"></button>
                        <button class="white"  onclick="setWhiteColor()"></button>
                        <button class="blue" onclick="setBlueColor()"></button>
                        <button class="purple" onclick="setPurpleColor()"></button>
                    </div>
                     
                    <div class="flex-container5">
                        <button id="okayButton" class="mybutton2">OK</button>
                        <button class="mybutton2" onclick="backFunction2()">BACK</button>
                   </div>
                </div>

                <div id="stickyPlace" class="flex-containerSticky"></div>
                

                <div id="importFiles">
                    <p id="importText">Select local CSV File:</p>
                    <input id="file" type="file" accept=".csv">
                    <button id="confirmInformation" onclick="submitAction()">Submit</button>
                </div>
                

            </div>

        </div>
    </div>
    </main>

  
    <script src="{{ asset('js/functionality.js') }}"></script>

    </body>
</html>
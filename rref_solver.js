            //Created objects
        function coord(c,r){
            this.col=c;
            this.row=r;
        }

        //Euclidean algorithm for finding GCD
        function gcd(first, second){
            if(second==0)
                return first;
            return gcd(Math.abs(second),Math.abs(first%second));
        }

        //fraction class implemented for use when displaying the answer    
        function fraction(n,d){
            var r = gcd(n,d);
            this.numerator = n/r;
            this.denominator = d/r;
<<<<<<< HEAD
            if(this.denominator<=0){
=======
            if(this.denominator<0){
>>>>>>> 83a5363e580b3d4c195fe8bc11cdb830c1721334
                this.denominator = -this.denominator;
                this.numerator = -this.numerator;
            }
            this.evaluate = function(){
                return this.numerator/this.denominator;
            }
        }
           
        function add(firstFraction,secondFraction){
            var n = firstFraction.numerator*secondFraction.denominator+secondFraction.numerator*firstFraction.denominator;
            var d = firstFraction.denominator*econdFraction.denominator;
            return new fraction(n,d);
        }
        function subtract(firstFraction,secondFraction){
            var n = firstFraction.numerator*secondFraction.denominator-secondFraction.numerator*firstFraction.denominator;
            var d = firstFraction.denominator*secondFraction.denominator;
            return new fraction(n,d);
        }
        function multiply(firstFraction,secondFraction){
            var n = firstFraction.numerator*secondFraction.numerator;
            var d = firstFraction.denominator*secondFraction.denominator;
            return new fraction(n,d);
        }
        function divide(firstFraction,secondFraction){
            var n = firstFraction.numerator*secondFraction.denominator;
            var d = firstFraction.denominator*secondFraction.numerator;
            return new fraction(n,d);
        }

        function createTable(c,r){
                var tbl = document.getElementById('matrix');
                tbl.innerHTML='';
                var tbdy = document.createElement('tbody');
                for (var i = 0; i < c; i++) {
                    var tr = document.createElement('tr');
                    for (var j = 0; j < r; j++) {
                        var td = document.createElement('td');
                        var cell =document.createElement('input');
                        cell.className="shrunkenInput";
                        td.appendChild(cell);
                        tr.appendChild(td);
                    }
                    tbdy.appendChild(tr);
                }
                tbl.appendChild(tbdy);
                document.getElementById("matrix").style.visibility = "visible";
        }

<<<<<<< HEAD
        function fillTable(data,name){
            var tbl = document.getElementById(name);
=======
        function createSolutionTable(data){
            var tbl = document.getElementById('solutionMatrix');
>>>>>>> 83a5363e580b3d4c195fe8bc11cdb830c1721334
            tbl.innerHTML='';
                var tbdy = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    var tr = document.createElement('tr');
                    for (var j = 0; j < data[i].length; j++) {
                        var td = document.createElement('td');
                        td.className="paddedRow";
                        var number =data[i][j].evaluate();
                        if(Number.isInteger(number)){
                            td.appendChild(document.createTextNode(number));
                        }else{
                            td.appendChild(document.createTextNode(data[i][j].numerator+"/"+data[i][j].denominator));
                        }
                        tr.appendChild(td);
                    }
                    tbdy.appendChild(tr);
                }
                tbl.appendChild(tbdy);
        }

        function findLeadingNonZeroCoord(startingCol,startingRow,data){
            for(var i=startingCol;i<data[0].length;i++){
                for(var j=startingRow;j<data.length;j++){
                    if(data[j][i].evaluate()!=0){
                        //x y pair
                        var leadingNonZero =new coord(i,j);
                        return leadingNonZero;
                    }
                }
            }
            return null;
        }
        function bringToREF(data){
            var currentRow=0, currentCol=0;
            while(currentRow<data.length){
                leadingNonZero = findLeadingNonZeroCoord(currentCol,currentRow,data);
                if(leadingNonZero!=null){
                    //if leadingOne is null, everything below current row is zeroes, and the system is in REF
                    var temp=data[currentRow];
                    data[currentRow]=data[leadingNonZero.row];
                    data[leadingNonZero.row]=temp;
                    //next column to check would be after leading non zero, as any before are all zeroes
                    currentCol = leadingNonZero.col;
                }else{
                    break;
                }
                //now that the leading non zero is in the highest unsolved row, we have to make it a leading one
                //simplest way to do this is divide everything in the row by the element at x = leadingNonZero.col,y = leadingNonZero.row
                var divideToOne = data[currentRow][currentCol];
                for(var i=currentCol;i<data[currentRow].length;i++){
                    data[currentRow][i]=divide(data[currentRow][i],divideToOne);
                }
                //now all numbers below the current pivot need to be reduced to zero
                for(var i=currentRow+1;i<data.length;i++){
                    if(data[i][currentCol].evaluate()!=0){
                        var multipleOfSubtraction = data[i][currentCol];
                        for(var j=currentCol;j<data[i].length;j++){
                            data[i][j]=subtract(data[i][j],multiply(data[currentRow][j],multipleOfSubtraction));
                        }   
                    }
                }
                currentRow++;
                currentCol++;
            }
        }
        function bringToRREF(data){
            currentRow = data.length-1;
            while(currentRow>0){
                for( var i=0;i<data[currentRow].length;i++){
                    //found pivot
                    if(data[currentRow][i].evaluate()==1){
                        for(var j=currentRow-1;j>=0;j--){
                            if(data[j][i].evaluate()!=0){
                                var multipleOfSubtraction = data[j][i];
                                for(var k=i;k<data[j].length;k++){
                                    data[j][k]=subtract(data[j][k],multiply(data[currentRow][k],multipleOfSubtraction));
                                }
                            }
                        }
                        break;
                    }
                }
                currentRow--;
            }
        }
        function getData(){
            var data=[];
            var tbl = document.getElementById('matrix');
            for(var i=0;i<tbl.rows.length;i++){
                var rowData =[];
                for(var j=0;j<tbl.rows[i].cells.length;j++){
                    if(tbl.rows[i].cells[j].children[0].value.includes('/')){
                        var fData = tbl.rows[i].cells[j].children[0].value.split('/')
                        rowData.push(new fraction(fData[0],fData[1]));
                    }else{
<<<<<<< HEAD
                        rowData.push(new fraction(parseInt(tbl.rows[i].cells[j].children[0].value)||0,1));
=======
                        rowData.push(new fraction(eval(tbl.rows[i].cells[j].children[0].value)||0,1));
>>>>>>> 83a5363e580b3d4c195fe8bc11cdb830c1721334
                    }
                }
                data.push(rowData);
            }
            return data;
        }
        function solve(){
            var data =getData();
<<<<<<< HEAD
            fillTable(data,"beforeMatrix");
            document.getElementById("before").style.visibility = "visible";
            bringToREF(data);
            bringToRREF(data);
            fillTable(data,"solutionMatrix");
=======
            bringToREF(data);
            bringToRREF(data);
            createSolutionTable(data);
>>>>>>> 83a5363e580b3d4c195fe8bc11cdb830c1721334
            document.getElementById("solution").style.visibility = "visible";
        }

import Pagination from "react-js-pagination";
const [pageNum,setPageNum]=useState(1)
const [pageLimit,setPageLimit]=useState(10)

function ListData({ limit,pagenum, list = [],children }) {
    let paginatedlist=[]
    var j=0
    var k=0
    for (var i in list){
    console.log("list",list)
    console.log(paginatedlist,limit, pagenum,(pagenum*limit)-limit,i,j,list[i])
    // console.log(parseInt(i)===((pagenum*limit)-limit),i,(pagenum*limit)-limit)
    console.log("Page "+(pagenum))
    if((parseInt(i))===((pagenum*limit)-limit)){
        
        for (var k=0; k<limit;k++){
        if (list[parseInt(i)+k]){
        paginatedlist.push(list[parseInt(i)+k])}
        }
    }
    j=j+1
    }
    return (
        paginatedlist.map((item, index) => (
            {children}
        ))
)
}

function PaginatedList({list,children}) {
    return (
        <>
            <ListData limit={pageLimit} pagenum={pageNum} list={list}>
                {children}
            
            </ListData>
            <Pagination
                activePage={pageNum}
                itemsCountPerPage={pageLimit}
                totalItemsCount={list.length}
                pageRangeDisplayed={5}
                // onPageChange={}
                itemClass="page-item "
                linkClass="page-link float-center"
                onChange={(e)=>{
                    console.log(e);
                    setPageNum(e)}}
            
            />
    
        </>
        )
    }
export default PaginatedList




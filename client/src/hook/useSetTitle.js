import React from 'react'

const useSetTitle = ({title}) => {
    React.useEffect(() => {
        document.title = title || "Finance Tracker";
    }, [title]);
}

export default useSetTitle;
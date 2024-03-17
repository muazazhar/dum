'use client'
import { DetailsView, FileManagerComponent, NavigationPane, Toolbar, Inject } from '@syncfusion/ej2-react-filemanager';

function Viewer() {
    let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    let ajaxSettings = {
        url: hostUrl + "api/FileManager/FileOperations",
        getImageUrl: hostUrl + "api/FileManager/GetImage"
    };

    return (
        <div className="control-section">
            <FileManagerComponent id="file" view="LargeIcons" ajaxSettings={ajaxSettings} >
                <Inject services={[NavigationPane, DetailsView, Toolbar]} />
            </FileManagerComponent>
        </div>
    );
}
export default Viewer;
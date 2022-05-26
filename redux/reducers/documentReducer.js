
const INITIAL_STATE = {
    documentAndPaperList: '',
    documentSignature: '',
    documentSignatureMessage: '',
    saveDocument: ''
}

export default function document(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CAREGIVER_DOCUMENT_PAPER_LIST':
            return {
                ...state,
                documentAndPaperList: action.documentAndPaperList
            }
        case 'CAREGIVER_DOCUMENT_TEMPLATE':
            return {
                ...state,
                documentTemplate: action.documentTemplate
            }
            break;
        case 'DOWNLOADED_DOCUMENT':
            return {
                ...state,
                downloadedTemplate: action.downloadedTemplate
            }
            break;
        case 'GET_DOCUMENT_SIGNATURE':
            return {
                ...state,
                documentSignature: action.documentSignature
            }
            break;
            case 'SAVE_DOCUMENT_SIGNATURE':
                return {
                    ...state,
                    documentSignatureMessage: action.documentSignatureMessage
                }
            break;
            case 'SAVE_DOCUMENT':
                return {
                    ...state,
                    saveDocument: action.saveDocument
                }
        default:
            return state
    }
}
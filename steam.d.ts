// Type definitions for steam
// Project: https://github.com/seishun/node-steam
// Definitions by: Andrey Kurdyumov <https://github.com/kant2002>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />


declare module "steam" {
  import {EventEmitter} from 'events';
  var servers:SteamServer[];


  export interface LogonOptions {
    account_name: string;
    password: string;
    sha_sentryfile?: Buffer;
    authCode?: string;
  }

  export enum EResult {
    Invalid = 0,
    OK = 1,
    Fail = 2,
    NoConnection = 3,
    InvalidPassword = 5,
    LoggedInElsewhere = 6,
    InvalidProtocolVer = 7,
    InvalidParam = 8,
    FileNotFound = 9,
    Busy = 10,
    InvalidState = 11,
    InvalidName = 12,
    InvalidEmail = 13,
    DuplicateName = 14,
    AccessDenied = 15,
    Timeout = 16,
    Banned = 17,
    AccountNotFound = 18,
    InvalidSteamID = 19,
    ServiceUnavailable = 20,
    NotLoggedOn = 21,
    Pending = 22,
    EncryptionFailure = 23,
    InsufficientPrivilege = 24,
    LimitExceeded = 25,
    Revoked = 26,
    Expired = 27,
    AlreadyRedeemed = 28,
    DuplicateRequest = 29,
    AlreadyOwned = 30,
    IPNotFound = 31,
    PersistFailed = 32,
    LockingFailed = 33,
    LogonSessionReplaced = 34,
    ConnectFailed = 35,
    HandshakeFailed = 36,
    IOFailure = 37,
    RemoteDisconnect = 38,
    ShoppingCartNotFound = 39,
    Blocked = 40,
    Ignored = 41,
    NoMatch = 42,
    AccountDisabled = 43,
    ServiceReadOnly = 44,
    AccountNotFeatured = 45,
    AdministratorOK = 46,
    ContentVersion = 47,
    TryAnotherCM = 48,
    PasswordRequiredToKickSession = 49,
    AlreadyLoggedInElsewhere = 50,
    Suspended = 51,
    Cancelled = 52,
    DataCorruption = 53,
    DiskFull = 54,
    RemoteCallFailed = 55,
    PasswordNotSet = 56, // obsolete "renamed to PasswordUnset"
    PasswordUnset = 56,
    ExternalAccountUnlinked = 57,
    PSNTicketInvalid = 58,
    ExternalAccountAlreadyLinked = 59,
    RemoteFileConflict = 60,
    IllegalPassword = 61,
    SameAsPreviousValue = 62,
    AccountLogonDenied = 63,
    CannotUseOldPassword = 64,
    InvalidLoginAuthCode = 65,
    AccountLogonDeniedNoMailSent = 66, // obsolete "renamed to AccountLogonDeniedNoMail"
    AccountLogonDeniedNoMail = 66,
    HardwareNotCapableOfIPT = 67,
    IPTInitError = 68,
    ParentalControlRestricted = 69,
    FacebookQueryError = 70,
    ExpiredLoginAuthCode = 71,
    IPLoginRestrictionFailed = 72,
    AccountLocked = 73, // obsolete "renamed to AccountLockedDown"
    AccountLockedDown = 73,
    AccountLogonDeniedVerifiedEmailRequired = 74,
    NoMatchingURL = 75,
    BadResponse = 76,
    RequirePasswordReEntry = 77,
    ValueOutOfRange = 78,
    UnexpectedError = 79,
    Disabled = 80,
    InvalidCEGSubmission = 81,
    RestrictedDevice = 82,
    RegionLocked = 83,
    RateLimitExceeded = 84,
    AccountLogonDeniedNeedTwoFactorCode = 85, // obsolete "renamed to AccountLoginDeniedNeedTwoFactor"
    AccountLoginDeniedNeedTwoFactor = 85,
    ItemOrEntryHasBeenDeleted = 86, // obsolete "renamed to ItemDeleted"
    ItemDeleted = 86,
    AccountLoginDeniedThrottle = 87,
    TwoFactorCodeMismatch = 88,
    TwoFactorActivationCodeMismatch = 89,
    AccountAssociatedToMultiplePlayers = 90,  // obsolete "renamed to AccountAssociatedToMultiplePartners"
    AccountAssociatedToMultiplePartners = 90,
    NotModified = 91,
    NoMobileDeviceAvailable = 92, // obsolete "renamed to NoMobileDevice"
    NoMobileDevice = 92,
    TimeIsOutOfSync = 93, // obsolete "renamed to TimeNotSynced"
    TimeNotSynced = 93,
    SMSCodeFailed = 94,
    TooManyAccountsAccessThisResource = 95, // obsolete "renamed to AccountLimitExceeded"
    AccountLimitExceeded = 95,
    AccountActivityLimitExceeded = 96,
    PhoneActivityLimitExceeded = 97,
    RefundToWallet = 98,
    EmailSendFailure = 99,
    NotSettled = 100,
    NeedCaptcha = 101,
  }

  export enum EPersonaState {
    Online
  }

  export enum EChatEntryType {
    ChatMsg
  }

  export enum EChatMemberStateChange {
    Kicked
  }

  export interface SteamServer {
    port:number;
    host:string;
  }


  export class SteamClient extends EventEmitter {
    connected:boolean;
    loggedOn:boolean;


    sessionId:string;
    cookie:string[];
    steamID:string;
    users:{};

    connect():void;
    disconnect():void;
  }

  export class SteamUser extends EventEmitter {
    constructor(client: SteamClient);

    logOn(options:LogonOptions):void;
  }

  export class SteamFriends extends EventEmitter {
    constructor(client: SteamClient);

    joinChat(chatId:string):void;

    sendMessage(source:any, message:string, entryType:EChatEntryType):void;

    setPersonaState(state:EPersonaState):void;

    setPersonaName(name:string):void;
  }
}

declare module "is-dota2-client" {

  import {SteamClient} from 'steam';
  import {EventEmitter} from 'events';

  export class Dota2Client extends EventEmitter {
    Lobby:any;
    AccountID:string;

    constructor(client: SteamClient, debug:boolean, debugMore:boolean);

    ToAccountID(id:string):string;
    launch():void;
    exit():void;

    joinChat(lobbyName:string, type:number);
    sendMessage(lobbyName:string, message:string):void;
    practiceLobbyKick(accountId:string);
    practiceLobbyKickFromTeam(accountId:string);
    leaveChat(lobbyName:string);
    requestChatChannels();


    abandonCurrentGame():void;
    createPracticeLobby(password: string, gameOptions: any, func: (err:any, body: any) => void);
    leavePracticeLobby(callback:Function):void;
    launchPracticeLobby():void;
    inviteToLobby(steamIds:string);
    setToSpectator():void;
  }
}

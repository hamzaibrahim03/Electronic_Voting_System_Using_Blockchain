// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;

/// @title Decentralized Voting System
/// @author
/// @notice This contract facilitates the creation and management of a decentralized voting system.
/// @dev All function calls are currently implemented without side effects.
contract Voting {
    /// @notice Represents a single vote.
    /// @param voterAddress The address of the voter.
    /// @param choice The choice selected by the voter.
    struct Vote {
        address voterAddress;
        string choice;
    }

    /// @notice Represents a voter.
    /// @param voterName The name of the voter.
    /// @param voted Indicates whether the voter has cast their vote.
    struct Voter {
        string voterName;
        bool voted;
    }

    /// @notice Total number of voters registered.
    uint256 public totalVoter = 0;

    /// @notice Total number of votes cast.
    uint256 public totalVote = 0;

    /// @notice Total number of choices added.
    uint256 public choiceCount = 0;

    /// @notice Address of the ballot official who deployed the contract.
    address public ballotOfficialAddress;

    /// @notice Official name/title of the ballot/election.
    string public ballotOfficialName;

    /// @notice Proposal or description of the ballot.
    string public proposal;

    /// @notice Mapping of choice IDs to their corresponding choice names.
    mapping(uint256 => string) public choices;

    /// @notice Mapping of vote IDs to their corresponding Vote structs.
    mapping(uint256 => Vote) private votes;

    /// @notice Mapping of voter addresses to their corresponding Voter structs.
    mapping(address => Voter) public voterRegister;

    /// @notice Mapping of result IDs to their corresponding choice names.
    mapping(uint256 => string) public result;

    /// @notice Enumeration of the possible states of the voting process.
    enum State {
        Created, // Initial state when the ballot is created.
        Voting,  // State when voting is active.
        Ended    // State when voting has concluded.
    }

    /// @notice Current state of the voting process.
    State public state;

    /// @notice Emitted when a new voter is added.
    /// @param voter The address of the voter added.
    event voterAdded(address indexed voter);

    /// @notice Emitted when a new choice is added.
    /// @param choice The name of the choice added.
    event choiceAdded(string choice);

    /// @notice Emitted when voting starts.
    event voteStarted();

    /// @notice Emitted when voting ends.
    event voteEnded();

    /// @notice Emitted when a voter casts their vote.
    /// @param voter The address of the voter who voted.
    event voteDone(address indexed voter);

    /// @notice Modifier to check a given condition.
    /// @param _condition The condition to evaluate.
    modifier condition(bool _condition) {
        require(_condition, "Condition not met.");
        _;
    }

    /// @notice Modifier to restrict functions to the ballot official only.
    modifier onlyOfficial() {
        require(msg.sender == ballotOfficialAddress, "Only ballot official can perform this action.");
        _;
    }

    /// @notice Modifier to ensure functions are called in a specific state.
    /// @param _state The required state for the function to execute.
    modifier inState(State _state) {
        require(state == _state, "Function cannot be called at this time.");
        _;
    }

    /// @notice Constructor to initialize the ballot with official details and proposal.
    /// @param _ballotOfficialName The official name/title of the ballot.
    /// @param _proposal The proposal or description of the ballot.
    constructor(string memory _ballotOfficialName, string memory _proposal) {
        ballotOfficialAddress = msg.sender;
        ballotOfficialName = _ballotOfficialName;
        proposal = _proposal;

        state = State.Created;
    }

    /// @notice Adds a new choice to the ballot.
    /// @dev Only callable by the ballot official during the Created state.
    /// @param _choice The name of the choice to be added.
    function addChoice(string memory _choice)
        public
        inState(State.Created)
        onlyOfficial
    {
        choices[choiceCount] = _choice;
        choiceCount++;
        emit choiceAdded(_choice);
    }

    /// @notice Registers a new voter.
    /// @dev Only callable by the ballot official during the Created state.
    /// @param _voterAddress The Ethereum address of the voter.
    /// @param _voterName The name of the voter.
    function addVoter(address _voterAddress, string memory _voterName)
        public
        inState(State.Created)
        onlyOfficial
    {
        Voter memory v;
        v.voterName = _voterName;
        v.voted = false;
        voterRegister[_voterAddress] = v;
        totalVoter++;
        emit voterAdded(_voterAddress);
    }

    /// @notice Initiates the voting process.
    /// @dev Only callable by the ballot official during the Created state.
    function startVote() public inState(State.Created) onlyOfficial {
        state = State.Voting;
        emit voteStarted();
    }

    /// @notice Allows a registered voter to cast their vote.
    /// @dev Callable only during the Voting state. Each voter can vote only once.
    /// @param _choice The choice selected by the voter.
    /// @return voted Returns true if the vote was successfully cast, false otherwise.
    function doVote(string memory _choice)
        public
        inState(State.Voting)
        returns (bool voted)
    {
        bool found = false;

        // Check if the voter is registered and hasn't voted yet.
        if (
            bytes(voterRegister[msg.sender].voterName).length != 0 &&
            !voterRegister[msg.sender].voted
        ) {
            voterRegister[msg.sender].voted = true;
            Vote memory v;
            v.voterAddress = msg.sender;
            v.choice = _choice;

            votes[totalVote] = v;
            totalVote++;

            found = true;
        }
        emit voteDone(msg.sender);
        return found;
    }

    /// @notice Concludes the voting process and records the results.
    /// @dev Only callable by the ballot official during the Voting state.
    function endVote() public inState(State.Voting) onlyOfficial {
        state = State.Ended;

        // Aggregate the results by recording each vote's choice.
        for (uint256 i = 0; i < totalVote; i++) {
            result[i] = votes[i].choice;
        }

        emit voteEnded();
    }

    /// @notice Retrieves the total number of votes for a specific choice.
    /// @dev Callable only after the voting has ended.
    /// @param _choice The choice for which vote count is requested.
    /// @return voteCount The total number of votes for the specified choice.
    function getVote(string memory _choice)
        public
        view
        inState(State.Ended)
        returns (uint256 voteCount)
    {
        uint256 count = 0;

        // Iterate through all votes to count how many times the choice was selected.
        for (uint256 i = 0; i < totalVote; i++) {
            if (
                keccak256(bytes(votes[i].choice)) == keccak256(bytes(_choice))
            ) {
                count++;
            }
        }

        return count;
    }
}

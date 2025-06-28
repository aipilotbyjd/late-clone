import { Test, TestingModule } from '@nestjs/testing';
import { NodeExecutor } from './node.executor.ts';
import { CredentialsService } from '../../domains/credentials/credentials.service';
import { NODE_REGISTRY } from '../registry/constants';
import { RegisteredNode, NodeContext } from '../../interfaces/node.interface';
import { Logger } from '@nestjs/common';

// Suppress console logs during tests for cleaner output
jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});
jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

describe('NodeExecutor', () => {
  let executor: NodeExecutor;
  let mockCredentialsService: Partial<CredentialsService>;
  let mockNodeRegistry: Map<string, RegisteredNode>;

  const mockUserId = 'user-123';

  beforeEach(async () => {
    mockCredentialsService = {
      getCredential: jest.fn(),
    };

    mockNodeRegistry = new Map<string, RegisteredNode>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeExecutor,
        {
          provide: CredentialsService,
          useValue: mockCredentialsService,
        },
        {
          provide: NODE_REGISTRY,
          useValue: mockNodeRegistry,
        },
      ],
    }).compile();

    executor = module.get<NodeExecutor>(NodeExecutor);
  });

  // Test case 1: Node with credentials, credential found
  it('should fetch and pass credentials if node requires them and they are found', async () => {
    const credData = { token: 'test-token' };
    (mockCredentialsService.getCredential as jest.Mock).mockResolvedValue({ data: credData });

    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'test-node',
      name: 'Test Node',
      credentials: ['test_cred_name'],
      run: mockNodeRun,
    };
    mockNodeRegistry.set('test-node', nodeDefinition);

    const nodeConfig = { type: 'test-node', params: {} };
    const inputs: any[] = [];

    await executor.execute(nodeConfig, inputs, mockUserId);

    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('test_cred_name', mockUserId);
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: { test_cred_name: credData },
        userId: mockUserId,
      }),
    );
  });

  // Test case 2: Node with credentials, credential NOT found
  it('should pass empty object for credential if not found', async () => {
    (mockCredentialsService.getCredential as jest.Mock).mockResolvedValue(null);

    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'test-node-missing-cred',
      name: 'Test Node Missing Cred',
      credentials: ['missing_cred'],
      run: mockNodeRun,
    };
    mockNodeRegistry.set('test-node-missing-cred', nodeDefinition);

    const nodeConfig = { type: 'test-node-missing-cred', params: {} };
    await executor.execute(nodeConfig, [], mockUserId);

    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('missing_cred', mockUserId);
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: { missing_cred: {} },
      }),
    );
  });

  // Test case 3: Node with credentials, no userId provided
  it('should not call CredentialsService and pass empty credentials if no userId is provided', async () => {
    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'test-node-no-user',
      name: 'Test Node No User',
      credentials: ['cred_for_no_user'],
      run: mockNodeRun,
    };
    mockNodeRegistry.set('test-node-no-user', nodeDefinition);

    const nodeConfig = { type: 'test-node-no-user', params: {} };
    await executor.execute(nodeConfig, [], ''); // Empty userId

    expect(mockCredentialsService.getCredential).not.toHaveBeenCalled();
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: { cred_for_no_user: {} },
        userId: '', // userId is still passed as it was given
      }),
    );
  });

  // Test case 4: Node without credentials
  it('should not call CredentialsService if node does not require credentials', async () => {
    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'test-node-no-creds',
      name: 'Test Node No Creds',
      // credentials array is undefined or empty
      run: mockNodeRun,
    };
    mockNodeRegistry.set('test-node-no-creds', nodeDefinition);

    const nodeConfig = { type: 'test-node-no-creds', params: {} };
    await executor.execute(nodeConfig, [], mockUserId);

    expect(mockCredentialsService.getCredential).not.toHaveBeenCalled();
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: {},
      }),
    );
  });

  // Test case 4b: Node with empty credentials array
  it('should not call CredentialsService if node has empty credentials array', async () => {
    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'test-node-empty-creds',
      name: 'Test Node Empty Creds',
      credentials: [], // Explicitly empty
      run: mockNodeRun,
    };
    mockNodeRegistry.set('test-node-empty-creds', nodeDefinition);

    const nodeConfig = { type: 'test-node-empty-creds', params: {} };
    await executor.execute(nodeConfig, [], mockUserId);

    expect(mockCredentialsService.getCredential).not.toHaveBeenCalled();
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: {},
      }),
    );
  });

  // Test case 5: Node with multiple credentials
  it('should fetch all credentials for a node requiring multiple', async () => {
    const credData1 = { token: 'token1' };
    const credData2 = { apiKey: 'key2' };
    (mockCredentialsService.getCredential as jest.Mock)
      .mockImplementation(async (credName: string, userId: string) => {
        if (credName === 'cred1') return { data: credData1 };
        if (credName === 'cred2') return { data: credData2 };
        return null;
      });

    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'multi-cred-node',
      name: 'Multi Cred Node',
      credentials: ['cred1', 'cred2'],
      run: mockNodeRun,
    };
    mockNodeRegistry.set('multi-cred-node', nodeDefinition);

    const nodeConfig = { type: 'multi-cred-node', params: {} };
    await executor.execute(nodeConfig, [], mockUserId);

    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('cred1', mockUserId);
    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('cred2', mockUserId);
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: { cred1: credData1, cred2: credData2 },
      }),
    );
  });

  // Test case 5b: Node with multiple credentials, one missing
  it('should fetch all credentials and provide empty for missing ones', async () => {
    const credData1 = { token: 'token1' };
    (mockCredentialsService.getCredential as jest.Mock)
      .mockImplementation(async (credName: string, userId: string) => {
        if (credName === 'cred1_found') return { data: credData1 };
        if (credName === 'cred2_missing') return null;
        return null;
      });

    const mockNodeRun = jest.fn().mockResolvedValue('node output');
    const nodeDefinition: RegisteredNode = {
      type: 'multi-cred-node-one-missing',
      name: 'Multi Cred Node One Missing',
      credentials: ['cred1_found', 'cred2_missing'],
      run: mockNodeRun,
    };
    mockNodeRegistry.set('multi-cred-node-one-missing', nodeDefinition);

    const nodeConfig = { type: 'multi-cred-node-one-missing', params: {} };
    await executor.execute(nodeConfig, [], mockUserId);

    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('cred1_found', mockUserId);
    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('cred2_missing', mockUserId);
    expect(mockNodeRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: { cred1_found: credData1, cred2_missing: {} },
      }),
    );
  });


  // Test case 6: Node type not registered
  it('should throw error if node type is not registered', async () => {
    const nodeConfig = { type: 'unregistered-node', params: {} };
    await expect(executor.execute(nodeConfig, [], mockUserId))
      .rejects.toThrow('Node type "unregistered-node" not registered');
  });

  // Test case 7: Action not found on multi-action node
  it('should throw error if action is not found on a multi-action node', async () => {
    const mockActionRun = jest.fn().mockResolvedValue('action output');
    const nodeDefinition: RegisteredNode = {
      type: 'multi-action-node',
      name: 'Multi Action Node',
      actions: {
        existingAction: { name: 'Existing Action', run: mockActionRun },
      },
    };
    mockNodeRegistry.set('multi-action-node', nodeDefinition);

    const nodeConfig = { type: 'multi-action-node', params: { action: 'nonExistentAction' } };
    await expect(executor.execute(nodeConfig, [], mockUserId))
      .rejects.toThrow('Action "nonExistentAction" not found on node "multi-action-node"');
  });

  // Test case for multi-action node, action found, with credentials
  it('should execute action and pass credentials for multi-action node', async () => {
    const credData = { token: 'action-token' };
    (mockCredentialsService.getCredential as jest.Mock).mockResolvedValue({ data: credData });

    const mockActionRun = jest.fn().mockResolvedValue('action output');
    const nodeDefinition: RegisteredNode = {
      type: 'multi-action-cred-node',
      name: 'Multi Action Cred Node',
      credentials: ['action_cred'],
      actions: {
        doSomething: { name: 'Do Something', run: mockActionRun },
      },
    };
    mockNodeRegistry.set('multi-action-cred-node', nodeDefinition);

    const nodeConfig = { type: 'multi-action-cred-node', params: { action: 'doSomething' } };
    await executor.execute(nodeConfig, [], mockUserId);

    expect(mockCredentialsService.getCredential).toHaveBeenCalledWith('action_cred', mockUserId);
    expect(mockActionRun).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: { action_cred: credData },
        userId: mockUserId,
        params: { action: 'doSomething' },
      }),
    );
  });

  // Test case for single-action node (instance.run) without run method
  it('should throw error if single-action node has no run method', async () => {
    const nodeDefinition: RegisteredNode = {
      type: 'no-run-method-node',
      name: 'No Run Method Node',
      // No run method and no actions
    };
    mockNodeRegistry.set('no-run-method-node', nodeDefinition);

    const nodeConfig = { type: 'no-run-method-node', params: {} };
     await expect(executor.execute(nodeConfig, [], mockUserId))
      .rejects.toThrow('Node "no-run-method-node" has no run() method');
  });

});
